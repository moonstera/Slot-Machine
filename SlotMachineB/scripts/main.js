import { world, ItemStack, EntityDataDrivenTriggerEventOptions, BlockLocation, Vector, MinecraftItemTypes, EntityQueryOptions, SoundOptions, EntityEventOptions } from "mojang-minecraft";

let result_event_option = new EntityDataDrivenTriggerEventOptions();
result_event_option.entityTypes = ["slot_machine:v1"];
result_event_option.eventTypes = ["result"];
world.events.dataDrivenEntityTriggerEvent.subscribe(event => {
  try{
    let entity = event.entity;
    let dim = event.entity.dimension;
    let skin_id = entity.getComponent('skin_id').value;
    let variant = entity.getComponent('variant').value;
    let mark_variant = entity.getComponent('mark_variant').value;
    let slot_1_data_3 = propertyToSlotData(skin_id, slot_1_data);
    let slot_2_data_3 = propertyToSlotData(variant, slot_2_data);
    let slot_3_data_3 = propertyToSlotData(mark_variant, slot_3_data);
    let bingo = getBingo(slot_1_data_3, slot_2_data_3, slot_3_data_3);
    let amount = 0;
    if(bingo.length > 0){
      for(let i of bingo){
        amount += role_data[i];
        //dim.runCommand("say " + String(i));
      }
      if(entity.hasTag('bet_2')){
        amount *= 2;
        entity.removeTag('bet_2');
      } else if(entity.hasTag('bet_3')){
        amount *= 3;
        entity.removeTag('bet_3');
      } else if(entity.hasTag('bet_4')){
        amount *= 4;
        entity.removeTag('bet_4');
      } else if(entity.hasTag('bet_5')){
        amount *= 5;
        entity.removeTag('bet_5');
      } else {
        entity.removeTag('bet_1');
      }
      let entity_query_options = new EntityQueryOptions();
      entity_query_options.location = entity.location;
      entity_query_options.maxDistance = 10;
      let players = dim.getPlayers(entity_query_options);
      let sound_options = new SoundOptions();
      sound_options.location = entity.location;
      for(let player of players){
        world.playSound("random.levelup", sound_options);
      }
      let item_stack = new ItemStack(MinecraftItemTypes.emerald, amount, 0);
      let items = dim.spawnItem(item_stack, new BlockLocation(entity.location.x, entity.location.y, entity.location.z));
      items.setVelocity(entity.viewVector);
    } else {
      //dim.runCommand("say なし");
    }
    //let dim = event.entity.dimension;
    //dim.runCommand("say " + String(event.id));
  } catch(error){
    console.error(error);
  }
}, result_event_option);

function getBingo(slot_1, slot_2, slot_3){
  let bingo = [];
  if(slot_1[0] == slot_2[0] && slot_2[0] == slot_3[0]){
    bingo.push(slot_1[0]);
  }
  if(slot_1[0] == slot_2[1] && slot_2[1] == slot_3[2]){
    bingo.push(slot_1[0]);
  }
  if(slot_1[1] == slot_2[1] && slot_2[1] == slot_3[1]){
    bingo.push(slot_1[1]);
  }
  if(slot_1[2] == slot_2[1] && slot_2[1] == slot_3[0]){
    bingo.push(slot_1[2]);
  }
  if(slot_1[2] == slot_2[2] && slot_2[2] == slot_3[2]){
    bingo.push(slot_1[2]);
  }
  return bingo;
}

function propertyToSlotData(property, slot_data){
  let slot_data_1_index = property > 0 ? property - 1 : max_slot - 1;
  let slot_data_3_index = property < max_slot-1 ? property + 1 : 0;
  return [slot_data[slot_data_1_index], slot_data[property], slot_data[slot_data_3_index]];
}

const max_slot = 18;
const role_data = {
  "diamond": 8,
  "sweet_berries": 2,
  "melon": 3,
  "emerald": 4.0,
  "apple_golden": 5,
  "amethyst_shard": 6,
  "nether_star": 10
};
const slot_1_data = {
  0: "diamond",
  1: "sweet_berries",
  2: "melon",
  3: "apple_golden",
  4: "emerald",
  5: "nether_star",
  6: "sweet_berries",
  7: "melon",
  8: "amethyst_shard",
  9: "emerald",
  10: "apple_golden",
  11: "sweet_berries",
  12: "emerald",
  13: "melon",
  14: "amethyst_shard",
  15: "emerald",
  16: "sweet_berries",
  17: "apple_golden",
};

const slot_2_data = {
  0: "diamond",
  1: "apple_golden",
  2: "sweet_berries",
  3: "melon",
  4: "amethyst_shard",
  5: "emerald",
  6: "melon",
  7: "sweet_berries",
  8: "nether_star",
  9: "emerald",
  10: "apple_golden",
  11: "emerald",
  12: "sweet_berries",
  13: "melon",
  14: "emerald",
  15: "amethyst_shard",
  16: "apple_golden",
  17: "sweet_berries",
};

const slot_3_data = {
  0: "diamond",
  1: "emerald",
  2: "apple_golden",
  3: "sweet_berries",
  4: "melon",
  5: "amethyst_shard",
  6: "melon",
  7: "emerald",
  8: "sweet_berries",
  9: "melon",
  10: "nether_star",
  11: "apple_golden",
  12: "emerald",
  13: "sweet_berries",
  14: "melon",
  15: "amethyst_shard",
  16: "sweet_berries",
  17: "emerald",
};