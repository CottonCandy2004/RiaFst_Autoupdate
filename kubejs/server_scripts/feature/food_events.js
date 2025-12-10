ItemEvents.foodEaten(event => { //豆腐料理
	if (event.item.id == "kubejs:berry_bean_curd") {
		if (Math.random() <= 0.2) {
			let pos = event.player.block.pos
			let player = event.player.name.getString()
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
			event.server.runCommandSilent(`execute at @a[name=${player}] run summon minecraft:lightning_bolt ${pos.x} ${pos.y} ${pos.z}`)
		}
		event.player.giveInHand('minecraft:bowl')
	}
	if (event.item.id == 'kubejs:sweet_bean_curd' || event.item.id == 'kubejs:salty_bean_curd' || event.item.id == 'kubejs:spicy_bean_curd') { //其他豆腐
		event.player.giveInHand('minecraft:bowl')
	}
})

ItemEvents.foodEaten("kubejs:caramel_cod_soup", event => { //焦糖鳕鱼羹
	event.player.giveInHand('minecraft:bowl')
	if (event.player.getHealth() <= 2) {
		event.server.tell(event.player.name.getString() + "摄入焦糖鳕鱼羹过多而死")
		event.player.attack(20)
	} else {
		event.player.runCommandSilent(`title @s actionbar "§c是错觉吗？似乎胃里有什么蹦跳了一下"`)
	}
	event.player.attack(2)
})

ItemEvents.foodEaten("kubejs:bomb_cod_burger", event => { //劲爆鳕鱼堡
	event.player.playSound('minecraft:entity.generic.explode')
	if (event.player.getHealth() <= 8) {
		event.server.tell(event.player.name.getString() + "服用劲爆鳕鱼堡时爆炸了")
		event.player.attack(20)
	} else {
		event.player.tell("砰！")
	}
	event.player.attack(8)
})

ItemEvents.foodEaten("kubejs:squid_festival", event => { //鱿鱼狂欢节
	event.player.giveInHand('minecraft:bowl')
})


BlockEvents.rightClicked(event => { //披萨
	let pos = event.block.pos
	if (event.hand != "MAIN_HAND") {
		return
	}

	if (event.block == 'kubejs:pizza_margarita' && event.player.crouching == false) { //玛格丽特披萨
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pizza_margarita2`)
	}
	if (event.block == 'kubejs:pizza_margarita2' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pizza_margarita3`)
	}
	if (event.block == 'kubejs:pizza_margarita3' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pizza_margarita4`)
	}
	if (event.block == 'kubejs:pizza_margarita4' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pizza_margarita')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} minecraft:air`)
	}


	if (event.block == 'kubejs:pork_pizza' && event.player.crouching == false) { //猪肉碎披萨
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pork_pizza2`)
	}
	if (event.block == 'kubejs:pork_pizza2' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pork_pizza3`)
	}
	if (event.block == 'kubejs:pork_pizza3' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:pork_pizza4`)
	}
	if (event.block == 'kubejs:pork_pizza4' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_pork_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} minecraft:air`)
	}


	if (event.block == 'kubejs:apple_pizza' && event.player.crouching == false) { //苹果披萨
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:apple_pizza2`)
	}
	if (event.block == 'kubejs:apple_pizza2' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:apple_pizza3`)
	}
	if (event.block == 'kubejs:apple_pizza3' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} kubejs:apple_pizza4`)
	}
	if (event.block == 'kubejs:apple_pizza4' && event.player.crouching == false) {
		event.player.giveInHand('kubejs:sliced_apple_pizza')
		event.server.runCommandSilent(`setblock ${pos.x} ${pos.y} ${pos.z} minecraft:air`)
	}
})
