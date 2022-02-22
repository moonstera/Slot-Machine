import { world, EntityDataDrivenTriggerEventOptions } from "mojang-minecraft";

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
    if(bingo.length > 0){
      for(let i of bingo){
        dim.runCommand("say " + String(i));
      }
    } else {
      dim.runCommand("say なし");
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
  if(slot_1[0] == slot_2[1] && slot_2[1] == slot_3[3]){
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

const max_slot = 12;
const slot_1_data = {
  0: "diamond",
  1: "sweet_berries",
  2: "melon",
  3: "cookie",
  4: "melon",
  5: "emerald",
  6: "sweet_berries",
  7: "apple_golden",
  8: "cookie",
  9: "apple_golden",
  10: "melon",
  11: "sweet_berries",
};

const slot_2_data = {
  0: "diamond",
  1: "apple_golden",
  2: "sweet_berries",
  3: "emerald",
  4: "cookie",
  5: "melon",
  6: "emerald",
  7: "sweet_berries",
  8: "melon",
  9: "cookie",
  10: "apple_golden",
  11: "cookie",
};

const slot_3_data = {
  0: "diamond",
  1: "emerald",
  2: "cookie",
  3: "sweet_berries",
  4: "melon",
  5: "cookie",
  6: "emerald",
  7: "apple_golden",
  8: "sweet_berries",
  9: "melon",
  10: "cookie",
  11: "apple_golden",
};