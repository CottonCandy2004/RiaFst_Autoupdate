const AABB = Java.loadClass("net.minecraft.world.phys.AABB")
const BaseEntityJS = Java.loadClass("net.liopyu.entityjs.entities.nonliving.entityjs.BaseEntityJS")
BlockEvents.rightClicked(event => {
    const { player, block, level } = event;
    const pos = block.pos;

    if (!global.isSeat(block)) return;
    if (player.isShiftKeyDown()) return;

    let seat = event.level.createEntity("kubejs:seat")

    const seats = level.getEntities(seat, new AABB(pos))
    const seatEntity = seats.filter(e => e instanceof BaseEntityJS);
    let passengers
    // console.log("seats:" + seats);

    if (!seatEntity.isEmpty()){
        passengers = seatEntity.get(0).getPassengers();

        // console.log("seatEntity: "+seatEntity+" passengers: "+passengers);
        if (!passengers.isEmpty() && passengers.get(0).isPlayer)
            event.cancel()
    }

    const offset = global.getSeatOffset(block);
    seat.setPos(pos.x + offset.x, pos.y + offset.y, pos.z + offset.z);
    level.addFreshEntity(seat);

    // 让玩家骑乘
    player.startRiding(seat, true);

    event.cancel();
});