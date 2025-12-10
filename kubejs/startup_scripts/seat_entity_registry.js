const BlockPos = Java.loadClass("net.minecraft.core.BlockPos");
StartupEvents.registry("entity_type", event => {
    event.create('seat', "entityjs:nonliving")
        .clientTrackingRange(20)
        .setRenderType("solid")
        .sized(0, 0)
        .modelSize(0, 0)
        .tick(entity => {
            const pos = entity.position();
            const posOffset = pos.add(0, 0.2, 0); // 0.2为匠心手测偏差
            const blockPosOffset = BlockPos.containing(posOffset);

            const blockPresent = entity.level.getBlockState(blockPosOffset).getBlock();
            if (entity.isVehicle() && global.isSeat(blockPresent))
                return;
            // console.log("bp: " + pos);
            // console.log("newPos: " + posOffset);
            // console.log("blockPresent: " + blockPresent);
            entity.discard();
        })
        .canAddPassenger(context => {
            const maxPassengers = 1;
            return context.entity.getPassengers().size() < maxPassengers;
        })
})

global.SeatBlockRegistry = {
    "buildersaddition:sofa_white": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_orange": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_magenta": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_light_blue": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_yellow": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_lime": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_pink": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_gray": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_light_gray": { x: 0.45, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_cyan": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_purple": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_blue": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_brown": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_green": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_red": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:sofa_black": { x: 0.5, y: 0.35, z: 0.5 },
    "buildersaddition:pillow_white": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_orange": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_magenta": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_light_blue": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_yellow": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_lime": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_pink": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_gray": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_light_gray": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_cyan": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_purple": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_blue": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_brown": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_green": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_red": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:pillow_black": { x: 0.5, y: -0.1, z: 0.5 },
    "buildersaddition:stool_oak": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:stool_spruce": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:stool_birch": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:stool_dark_oak": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:stool_jungle": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:stool_acacia": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:stool_crimson": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:stool_warped": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_oak": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_spruce": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_birch": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_dark_oak": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_jungle": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_acacia": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_crimson": { x: 0.5, y: 0.25, z: 0.5 },
    "buildersaddition:chair_warped": { x: 0.5, y: 0.25, z: 0.5 }
};

global.isSeat = function (block) {
    if (!block) return false;

    const id = String(block.id);

    return id in global.SeatBlockRegistry;
}

global.getSeatOffset = function (block) {
    const id = String(block.id);
    return global.SeatBlockRegistry[id] ?? { x: 0, y: 0, z: 0 };
}