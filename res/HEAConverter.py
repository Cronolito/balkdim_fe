import json

# Lista med keys för all data. Samma ska användas för frontendrubriker så man kan loopa genom keys och hämta det som ska
# visas ur både rubriker och värde
dict_keys = ['name', 'height', 'width', 'flangeThickness', 'webThickness', 'radius', 'surfaceArea', 'area', 'webArea',
             'density', 'momentOfInertia', 'W_y', 'Z_y', 'r_y', 'I_z', 'W_z', 'Z_z', 'r_z', 'K_v', 'W_v', 'Z_v', 'C',
             'K_w', 'W_w', 'Z_w', 'C_w']

def file_to_dict(fileName):
    # Listan med alla profiler
    beam_list = []

    with open(fileName, 'r') as f:
        f_content = f.readlines()
        first_part = []
        second_part = []
        temp_list =[]
        # Dela upp filens 2 delar i 2 listor
        for nr, line in enumerate(f_content):
            temp_list.append(line)
            if line == "rb\n":
                first_part = temp_list[0:-1]
                temp_list=[]
        second_part=temp_list

    # Sammanför listorna till dictionarys och lägger till i listan.
    for first, second in zip(first_part, second_part):
        beam_dict = {}
        profile_list = [first[0:8].replace(' ', ''),]
        profile_list = profile_list + ((first+second).replace('\n', '').replace(',', '.')[8:-8]).split(' ')

        try:
            profile_list.remove('')
        except:
            pass
        for i, key in enumerate(dict_keys):
            if i == 0:
                beam_dict[key] = profile_list[i]
            else:
                beam_dict[key] = float(profile_list[i])
    #     Använd första 8 char till key
        beam_list.append(beam_dict)

    return beam_list

def data_to_file(data_list):
    with open('beam_data.json', 'w') as write_file:
        json.dump(data_list, write_file, indent=4)

file_list = ['HEA.txt', 'HEB.txt', 'IPE.txt']
# Fixa IPE80 som har för få karaktärer.
to_JSON_list = []

for file_name in file_list:
    to_JSON_list.append({file_name.replace('.txt',''):file_to_dict(file_name)})

data_to_file(to_JSON_list)
