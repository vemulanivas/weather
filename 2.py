a=[10,2,33,4,6]
for i in range(len(a)):
    for j in range(i+1):
        if a[i]<a[j]:
            a[i],a[j]=a[j],a[i]
print(a[0],a[-1])

