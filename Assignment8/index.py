# # # # # # # # # # # # # # # # # # # # # #
# ALFREDO YAP                             #
# ASSIGNMENT 8                            #
# # # # # # # # # # # # # # # # # # # # # #

# # # # # # # # # # # # # # # # # # # # # #
# PART A                                  #
# # # # # # # # # # # # # # # # # # # # # #
# Create a list called myList with 8 values
print('PART A')
myList = [1, 2, 3, 4, 5, 6, 7, 8]
print('myList =', myList)
# Assign the values (from index # 1 to the end) of myList to a new list called myList2
myList2 = myList[1:]
print('myList2 =', myList2)
# append a new item myList2, remove the 3rd item then assign the list to myList3
myList2.append(9)
print('append 9 to myList2 =', myList2)
myList2.remove(3)
myList3 = myList2
# removed the 3rd item from myList2 and assigned the list to myList3
print('myList3 =', myList3)

# # # # # # # # # # # # # # # # # # # # # #
# PART B                                  #
# # # # # # # # # # # # # # # # # # # # # #
# Explain what each of the methods does, then print out the result of each method your own data.
print('\nPART B')
# count(sub,[start,[end]]) - returns the number of times sub appears in the list
print('myList3.count(2) =', myList3.count(2))

# endswith(suffix,[start,[end]]) - returns True if the list ends with the specified suffix, otherwise False
sampleString = 'Hello World'
print('sampleString =', sampleString)
print('sampleString.endswith("World") =', sampleString.endswith('World'))

# find/index(sub,[start,[end]]) - returns the lowest index in the list that sub appears, otherwise ValueError
print('myList3.index(2) =', myList3.index(2))

# join() - returns a string that is all the items in the list joined by the specified separator
print('",".join(myList3) =', ','.join(str(x) for x in myList3))

# replace(old,new,[count]) - returns a copy of the list with all occurrences of old replaced with new
sampleString = 'Hello World'
print('sampleString =', sampleString)
print('sampleString.replace("World","Universe") =',
      sampleString.replace('World', 'Universe'))

# split([sep,[maxsplit]]) - returns a list of all the words in the string separated by the specified separator
sampleString = 'Hello World'
print('sampleString =', sampleString)
print('sampleString.split(" ") =', sampleString.split(' '))

# splitlines([keepends]) - returns a list of all the lines in the string, breaking at line boundaries
sampleString = 'Hello World\nThis is a new line'
print('sampleString =', sampleString)
print('sampleString =', sampleString.splitlines())

# startswith(prefix,[start,[end]]) - returns True if the list starts with the specified prefix, otherwise False
sampleString = 'Hello World'
print(sampleString)
print('sampleString =', sampleString.startswith('Hello'))

# strip([chars]) - returns a copy of the string with both leading and trailing characters removed
sampleString = '   Hello World   '
print('sampleString =', sampleString)
print('sampleString =', sampleString.strip(' '))

# # # # # # # # # # # # # # # # # # # # # #
# PART C                                  #
# # # # # # # # # # # # # # # # # # # # # #
# Create a function to check if a number (from user's input) is a prime number
print('\nPART C')


def isPrime(num):
    if num > 1:
        for i in range(2, num):
            if (num % i) == 0:
                print(num, 'is not a prime number')
                break
        else:
            print(num, 'is a prime number')
    else:
        print(num, 'is not a prime number')


num = int(input('Enter a number: '))
isPrime(num)

# # # # # # # # # # # # # # # # # # # # # #
# PART D                                  #
# # # # # # # # # # # # # # # # # # # # # #
# Create a function called disStuinfo. It can take a vaired number of arguments. (Single values or pairs of values)
# Arguments example:
# 1001, 'John', 'Petter, Smith='jSmith@gmail.com', Potter="Petter@yahoo.com",
# Doe="j@gmail.com"
#
# def disStuinfo(schoolID, *firstName, **lastEmail):
#
# expected result:
# 10001
# John
# Smith
# jSmith@gmail
#
# 10001
# Petter
# Potter
# Petter@yahoo.com
#
# 10001
# 'unmatched'
# Doe
# j@gmail
print('\nPART D')


def disStuInfo(schoolID, *firstName, **lastEmail):
    print("School ID:", schoolID)
    print("First Names:", firstName)
    print("Last Email:", lastEmail)


# Calling the function with different arguments
disStuInfo(10001, 'John', 'Petter', Smith='jSmith@gmail.com', Potter="Petter@yahoo.com",
           Doe="j@gmail.com")
