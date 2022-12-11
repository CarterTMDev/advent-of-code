def main():
    # Read file
    data = open("input.txt").read()
    print(find_end_of_first_unique_substr(data, 4))
    print(find_end_of_first_unique_substr(data, 14))


def find_end_of_first_unique_substr(string: str, length: int) -> int:
    index = length
    substr = string[0:length]
    string_length = len(string)
    # Check if the start is unique
    if string_has_all_unique_chars(substr):
        return length
    
    while index < string_length:
        substr = substr[1:]
        if string[index] not in substr and string_has_all_unique_chars(substr):
            return index + 1
        substr += string[index]
        index += 1
    return -1
            

        

def string_has_all_unique_chars(string: str):
    searched = ""
    for char in string:
        if char not in searched:
            searched += char
        else:
            return False
    return True

main()