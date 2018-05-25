# Airplanes!

Download the starter code and solutions [here](https://github.com/brahmcapoor/CS106-teaching-materials/raw/master/CS106A/Airplanes/eclipse_project.zip).

## To students:

Open up `Airplane.java` and `Airport.java`. Try to implement the Airplane Class first (feel free to add any public or private methods you might need). A great suggestion is to add little messages in each of your methods indicating that the method is called. You can do so by including the following line of code in whichever method you like:

```java
System.out.println("<Your message here>");
```

Now, whenever one of those methods is called, you'll see the message show up in the Eclipse console. You can think of these messages as 'responses' from the plane to whichever 'airport' issued commands through it. You can't use the normal `println` method here, because the Airplane class isn't a console program so it doesn't have the `println` method. `System.out.println` method is Java's significantly uglier counterpart to `println`.

Once you've finished implementing the Airplane Class, try your hand at using it in the Airport program found in `Airport.java`. Most of the architecture for this is set up already, but feel free to shoot me any questions at [brahm@stanford.edu](mailto:brahm@stanford.edu).

Your takeaway from this should be that using classes is more an art than a science. Well-designed classes and their use take creativity and diligence to develop, but make your life easier in the long run. You'll have countless decisions to make, and while some choices are more reasonable than others, there's no one correct answer. The decisions I made in the solutions found in `AirplaneSoln.java` and `AirportSoln.java` are just one of an infinite number of ways of solving this problem, and you could very well argue that there are better ways of doing things. Ultimately, the best advice I can give is this: when designing classes, make decisions that _you_ think are reasonable and that _you_ think would make life easy for people using the class. The best way to develop this intuition, unsurprisingly, is practice.

## To Section Leaders:

Go wild with this. Modify it however you choose. This section -- and the world -- is your oyster. If you have any especially cool ideas, feel free to ping me or submit a PR: I'd love to hear or see your ideas!

## Credits

Problem ~shamelessly ripped from~ is a modified version of a wonderful problem written by [Julia Daniel](http://stanford.edu/~jdaniel7/).
