//现在时间复杂度应该是o(m*n)，m=玩家数,n=检查站数
//如果你有优化的打算的话，我写了很多注释，应该能帮到你

//allCheckerPos

//初始设置

let checkInterval = 5 * 1000
let yHeight = 4 // 检测的高度范围
let searchRadius = 1 //寻找棋盘格方块检测半径（3*3）
let subBlockId = "supplementaries:checker_block" 

let checkerIndexPath = 'config/CheckerData/posList.txt';
let checkerDataPath = 'config/CheckerData'
let checkerToBlocks = {}//相互连接的棋盘格方块集合

//服务器、玩家初始化

PlayerEvents.loggedIn(event => {
    event.player.persistentData.lastInChecker = Date.now()
})

ServerEvents.loaded(event => { //开服时：加载检查站所有坐标到列表
    if (!event.server.persistentData.contains("allCheckerPos")) {
        event.server.persistentData.putString("allCheckerPos", "");
    }
    if (!FilesJS.exists(checkerIndexPath)) {
        FilesJS.writeFile(checkerIndexPath, "");
    }
})

//维护检查站索引

BlockEvents.broken("kubejs:checker", event => { //破坏检查站时：在列表中删去此位置、同步文件
    let allCheckerPosString = ""
    event.server.persistentData.allCheckerPos.split("/").forEach(element => {
        if (element != `${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}`) {
            allCheckerPosString += "/"
            allCheckerPosString += element
            allCheckerPosString += "/"
        }
    })
    allCheckerPosString.replace(/\/+/g, '/')
    allCheckerPosString.replace("undefined", "")
    event.server.persistentData.allCheckerPos = allCheckerPosString
    SyncFile(event, true, `${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}`) //同步文件
    event.server.scheduleInTicks(20, function (callback0) {
        removeEmptyLines(checkerIndexPath)
    })
})

BlockEvents.placed("kubejs:checker", event => { //放置检查站时：在列表中加入此位置、同步文件
    let checkerPos = event.block.pos
    let checkerKey = `${checkerPos.x},${checkerPos.y},${checkerPos.z}`
    let allCheckerPosString = event.server.persistentData.getString("allCheckerPos")
    allCheckerPosString += `/${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}/`
    allCheckerPosString = allCheckerPosString.replace(/\/+/g, '/').replace(/^\/|\/$/g, '').replace("undefined", "")
    event.server.persistentData.allCheckerPos = allCheckerPosString
    SyncFile(event, false, `${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}`) //同步文件
    event.server.scheduleInTicks(20, function (callback0) {
        removeEmptyLines(checkerIndexPath)
    })
    let connectedBlocks = findConnectedBlocks(event, checkerPos)
    checkerToBlocks[checkerKey] = connectedBlocks
})

//检测玩家通过状态

ServerEvents.tick(event => {
    let nowTime = Date.now()
    let allPlayers = event.server.getPlayers()
    let allCheckerPos = event.server.persistentData.getString("allCheckerPos").split("/")
    allPlayers.forEach(player => {
        if (nowTime - player.persistentData.lastInChecker < checkInterval) {
            return
        }
        if (player.mainHandItem.id == "create:wrench") { //跳过所有手持扳手的玩家
            return
        }
        allCheckerPos.forEach(element => {
            if (IsInChecker(element, player.pos)) { //确认玩家处于检查站内
                let msg = timestampToString(nowTime, "[yyyy-MM-dd HH-mm-ss] ") + element + " " + player.name.getString()
                FilesJS.appendLine(checkerDataPath + "/" + element + ".txt", msg)
                event.server.runCommandSilent(`title ${player.name.getString()} actionbar [{"text":"你经过了一个检查站","color":"green"}]`)
                event.server.runCommandSilent(`execute as ${player.name.getString()} at @s run particle minecraft:totem_of_undying ~ ~1.5 ~ 1 1 1 0.5 100 normal`)
                event.server.runCommandSilent(`execute as ${player.name.getString()} at @s run playsound minecraft:block.note_block.harp player @a[distance=..20] ~ ~ ~ 1 1`)
                player.persistentData.lastInChecker = nowTime
            }
        })
    })
})

BlockEvents.rightClicked("kubejs:checker", event => {
    if (event.hand != "MAIN_HAND") return
    if (event.player.mainHandItem != "create:wrench") {
        return
    }
    if (event.player.isCrouching()) {
        let fileName = `${checkerDataPath}/${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}.txt`
        if (!FilesJS.exists(fileName)) {
            event.player.tell("！无法获取检查站信息，请尝试打破并重放")
            return
        }
        FilesJS.writeFile(fileName, "")
        event.player.tell("此检查站信息已清空")
    } else {
        let fileName = `${checkerDataPath}/${event.block.pos.x},${event.block.pos.y},${event.block.pos.z}.txt`
        if (!FilesJS.exists(fileName)) {
            event.player.tell("！无法获取检查站信息，请尝试打破并重放")
            return
        }
        let data = FilesJS.readLines(fileName)
        if (data.length == 0) {
            event.player.tell("此检查站还未有人路过")
            return
        }
        event.player.tell(`———————————————————————————————————`)
        data.forEach(element => {
            event.player.tell(element)
        })
        event.player.tell(`———————————————————————————————————`)
    }
})

//函数区

function SyncFile(event, isDelete, name) { //同步文件夹；同步索引并删除数据文件
    let allCheckerPos = event.server.persistentData.allCheckerPos.split("/")
    FilesJS.writeLines(checkerIndexPath, allCheckerPos)
    if (isDelete) {
        FilesJS.delete(checkerDataPath + "/" + name + ".txt")
    } else {
        if (!FilesJS.exists(checkerDataPath + "/" + name + ".txt")){
            FilesJS.writeFile(checkerDataPath + "/" + name + ".txt", "");
        }else {
            FilesJS.writeLines(checkerDataPath + "/" + name + ".txt", "");
        }
    }
}

function findConnectedBlocks(event, startPos) {
    let visited = new Set()
    let queue = [startPos]
    let result = [startPos]

    function key(pos) { return `${pos.x},${pos.y},${pos.z}` }
    visited.add(key(startPos))

    while (queue.length > 0) {
        let pos = queue.shift()

        // 搜索XZ平面3x3范围
        for (let dx = -searchRadius; dx <= searchRadius; dx++) {
            for (let dz = -searchRadius; dz <= searchRadius; dz++) {
                let checkPos = pos.offset(dx, 0, dz)
                if (!visited.has(key(checkPos))) {
                    let block = event.level.getBlock(checkPos)
                    if (block.id == subBlockId) {
                        visited.add(key(checkPos))
                        queue.push(checkPos)
                        result.push(checkPos)
                    }
                }
            }
        }
    }
    return result
}

function IsInChecker(checkerPosString, playerPos) {
    let blocks = checkerToBlocks[checkerPosString]
    if (!blocks) return false

    let px = playerPos.x()
    let py = playerPos.y()
    let pz = playerPos.z()

    // 检测是否在集合中任意方块的上方
    for (let pos of blocks) {
        let inX = px >= pos.x - 0.5 && px <= pos.x + 1.5
        let inZ = pz >= pos.z - 0.5 && pz <= pos.z + 1.5
        let inY = py >= pos.y && py <= pos.y + yHeight
        if (inX && inY && inZ) return true
    }
    return false
}