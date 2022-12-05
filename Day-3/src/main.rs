use std::fs;

fn main() {
    // Load file
    let contents = fs::read_to_string("input.txt").expect("");
    let rucksacks = contents.split("\n").collect();
    //part1(rucksacks);
    part2(rucksacks);
}

fn part1(rucksacks: Vec<&str>) {
    let mut priority_sum = 0;
    for rucksack in rucksacks {
        if rucksack.len() == 0 {
            continue;
        }

        // Find the matching letter
        let mut matching_item: char = '\0';
        let mut i = 0;
        let bag_size = rucksack.len() / 2;
        let mut bag1_items: Vec<char> = Vec::new();
        let mut bag2_items: Vec<char> = Vec::new();
        while i < bag_size {
            let item1 = rucksack.chars().nth(i).unwrap();
            let item2 = rucksack.chars().nth(i + bag_size).unwrap();
            if item1 == item2 || bag1_items.contains(&item2)
            {
                matching_item = item2;
                break;
            }
            else if bag2_items.contains(&item1) {
                matching_item = item1;
                break;
            }
            
            if !bag1_items.contains(&item1) {
                bag1_items.push(item1);
            }
            if !bag2_items.contains(&item2) {
                bag2_items.push(item2);
            }

            i += 1;
        }

        if matching_item != '\0' {
            priority_sum += get_priority(matching_item);
        }
    }

    println!("PRIORITY SUM = {priority_sum}");
}

fn part2(rucksacks: Vec<&str>) {
    let mut priority_sum = 0;
    let mut group: Vec<Vec<char>> = Vec::new();
    let mut badge: char = '\0';
    for rucksack in rucksacks {
        if rucksack.len() == 0 {
            continue;
        }
        let mut unique_items: Vec<char> = Vec::new();
        for c in rucksack.chars() { 
            // Store unique items that the previous elf also had (if a previous elf exists)
            if !unique_items.contains(&c) && !(group.len() > 0 && !group[group.len() - 1].contains(&c))
            {
                if group.len() == 2 {
                    // We found the badge
                    badge = c;
                    break;
                } else {
                    unique_items.push(c);
                }
            }
        }
        if badge == '\0' {
            group.push(unique_items);
        } else {
            // There should only be one item in the last list that all elves had
            priority_sum += get_priority(badge);
            group.clear();
            badge = '\0';
        }
    }

    println!("PRIORITY SUM = {priority_sum}");
}

fn get_priority(item : char) -> usize {
    let item_types : String = String::from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    for (index, char) in item_types.chars().enumerate() {
        if char == item {
            return index + 1;
        }
    }
    return 0;
}