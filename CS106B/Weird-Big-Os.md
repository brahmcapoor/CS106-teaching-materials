#Weird Big-Os and how to figure them out

In section, we've done a bunch of Big-O problems so far. Most of the algorithms that we've written (with the exception of recursive solutions, which we'll talk about in a bit) have had polynomial or radical runtimes: that is, their big-O is O(N^a) where a is some integer or fraction. In this handout, we'll explore two of the less conventional types of Big-O and how to figure them out.

## Logarithmic efficiency
### O(log(N))

Try to figure out what the following function does:

```C++
int mystery(int n) {
  int counter = 0;
  while(n != 0) {
    counter++;
    n = n/10;
  }
  return counter;
}
```

Hopefully, you've realised that it returns the lowest integer x such that 2^x is greater than or equal to n. Thanks to the wonders of integer division, we can just keep dividing until we get to 1.

What's the runtime of this function? Let's figure this out by looking at some examples:

```
mystery(128) = 7 // we do division 7 times
mystery(1024) = 10 // we do division 10 times
mystery(2) = 1 // we do division once
mystery(8) = 3 // we do division 3 times
mystery(1) = 0 // we don't do division
```

It should be fairly clear that the number of times we execute the line `n = n/2` is the log with base 2 of n. This intuitively makes sense, because that's also what the function is trying to find. Therefore, the number of times the while loop actually executes is based on the log with base 2 of n. For reasons I won't get into here but you can read about on [this page] (https://math.stackexchange.com/questions/37377/omitting-bases-in-logs-big-o), we can drop the base and just say that the big-O of this function is O(log(N)).


You can actually also write the same function recursively:
```C++
int recursiveMystery(int n) {
  if (n == 1) return 0;
  return 1 + recursiveMystery(n/2);
}
```

I'd first encourage you to verify for yourself that this is in fact the same thing as `mystery()` and that this function too has logarithmic efficiency. Recursion like this commonly has O(log(N)) efficiency, and while this isn't something you can take for granted, it is a good hint.

_Unrelated but cool: this is also an example of one of the coolest theories in computer science - that any recursive algorithm can be converted into a nonrecursive algorithm. This is absolutely out of the scope of 106B, but you should read more about this if you're interested or take more CS classes!_

Another example of a similar function with O(log(N)) runtime is:

```C++
int numDigits(int n) {
  if (n <= 0) throw "Error!";
  int counter = 0;
  while(n > 0) {
    counter++;
    n = n/10;
  }
}
```

This function returns the number of digits in a positive integer. You'll notice that this is pretty much the same function as the previous example.


## Exponential efficiency
### O(a^n) where a is some integer

Consider the following function:

```C++
int fibonacci(int n){
  if (n <= 0) throw "Error!";
  if ((n == 1) || (n == 2)) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
_(There are better ways to find fibonacci numbers. Try finding them! )_

Therefore, if n is greater than 2, we make 2 recursive calls. For each of those calls, we might make 2 recursive calls and so on and so forth. As a result, every time we go one level down in the recursion, we make double the function calls. More formally, for some large n:

```
fibonacci(n) // 1 call
= fibonacci(n-1) + fibonacci(n-2) // 2 calls
= fibonacci(n-2) + fibonacci (n-3) + fibonacci (n-3) + fibonacci(n-4) // 3 calls
.
.
.
```

Therefore, the number of times we do the recursion is capped at approximately 2^n, at the lowest level of the recursion. This means that the runtime of the function is O(2^n). Importantly, here we don't drop the base (pun intentional), so we need to write the 2.

This is also an example of recursion not being the best way to do something. Try to figure out an O(N) way of calculating the Nth fibonacci number!
