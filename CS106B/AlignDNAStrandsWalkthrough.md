# Align DNA Strands: Backtracking and Memoization
(Question 7 of section handout 4)

## Introduction

This problem is great for two reasons. Firstly, it's great practice with backtracking and memoization. Secondly, it's very similar to an important problem in biocomputation, and I think it's cool that a problem we do in section is so relevant in real life!

I strongly recommend you try and work through the problem yourself before going through this handout.


## Memoization summary

As we've seen in lecture, Memoization is the practice of caching the results of our recursive calls to avoid repeated calculation. Take, for example, the recursive fibonacci calculation:

```
fib(4) = fib(2) + fib(3)
fib(3) = fib(1) + fib(2)
=> fib(4) = fib(2) + fib(1) + fib(2)
```

As you can clearly see, we have to find `fib(2)` twice. This is a relatively simple calculation, so it probably isn't a huge deal, but you can imagine that if we were calculating `fib(N)` for larger `N`, it'd be more of a problem. Therefore, the first time we calculate `fib(2)`, it's probably a good idea to remember what that value is so we don't need to calculate is the next time.

In general, the structure we'd use to representing this cache of recursive results is a map where the key is some representation of the problem parameters, and the value is the result of the recursive call. In this example, therefore, your cache would probably be a map from integers (representing `N`) to integers (representing `fib(N)`).

Sometimes, you might be able to use another data structure as your cache, but this is very rare and I can't think of a good example of this.

## Our approach

The approach I'm going to take to go through this problem is to first make a non-memoized solution, and then show you how easy it is to add memoization.

## Non-memoized solution

```
int alignStrands(string &one, string &two) {
 if (one.empty()) return -2 * two.length();
 if (two.empty()) return -2 * one.length();

 if (one[0] == two[0]) { // two leading bases match
   int score = alignStrands(one.substr(1), two.substr(1)) + 1;
   return score; // the best solution is one where these bases are aligned
 }

 // otherwise the two bases don't match
 int first = alignStrands(one, two.substr(1)) - 2; // insert the space in one: OPTION 1
 int second = alignStrands(one.substr(1), two) - 2; // insert the space in two: OPTION 2
 int third = alignStrands(one.substr(1), two.substr(1)) - 1; // don't insert space: OPTION 3
 int best = max(first, max(second, third)); // choose best Option
 return best;
}
```

Try and figure out why this solution works!

## Memoized solution

The first thing we want to do is create a cache. Given that our recursive function takes in strings as input and returns an integer, it probably makes sense to make our map from strings to integer:

```
Map<string, int> cache;
```

Next, we want to figure out how to convert our problem parameters (the two strings) into a string representation. For the purposes of this, the representation will be the two strings, separated by a colon. For example, if the alignment score of the strings `"banter"` and `"ante"` is 0, the entry in the map would look like this:

```
cache["banter:ante"] == 0;
```

Cool! Now that we know what our cache will look like, let's figure out how to use it. Firstly, we should check at every call of the function whether the function has already been calculated for those specific parameters, and if so, just return that answer:

```
string key = one + ":" + two;
if (cache.containsKey[key]) return cache[key];
```

Next, we need to actually put calculated values into the map whenever we find a new one, and we're pretty much done!

```
if (one[0] == two[0]) {
  // int score = calculate alignment for one.substr(1), two.substr(1)
  cache[key] = score;
  return score
}
```

```
//Calculate first, second and third options
int best = max(first, max(second, third))
cache[key] = best;
return best;
```

And we're done! Here's the full code:

```
int alignStrands(string &one, string &two, Map<string, int> &cache) {
 if (one.empty()) return -2 * two.length();
 if (two.empty()) return -2 * one.length();

 string key = one + ":" + two;
 if (cache.containsKey[key]) return cache[key];

 if (one[0] == two[0]) { // two leading bases match
   int score = alignStrands(one.substr(1), two.substr(1), cache) + 1;
   cache[key] = score; 
   return score; // the best solution is one where these bases are aligned
 }

 // otherwise the two bases don't match
 int first = alignStrands(one, two.substr(1), cache) - 2; // insert the space in one: OPTION 1
 int second = alignStrands(one.substr(1), two, cache) - 2; // insert the space in two: OPTION 2
 int third = alignStrands(one.substr(1), two.substr(1), cache) - 1; // don't insert space: OPTION 3
 int best = max(first, max(second, third)); // choose best Option
 cache[key] = best;
 return best;
}

int alignStrands(const string& one, const string& two) {
 Map<string, int> cache;
 return alignStrands(one, two, cache);
}
```

Notice a couple of things about this:
* We now have a helper function
* The cache is passed by reference. Try and figure out why that is

And that's it! In 4 lines of code, we memoized our solution!
