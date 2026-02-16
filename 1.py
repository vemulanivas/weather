s = input()
odd_count = 0

for char in set(s):                    
    if s.count(char) % 2 != 0:         
        odd_count += 1

if odd_count <= 1:
    print("Yes")
else:
    print("No")
