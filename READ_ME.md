------------------------------------------------
WHAT IS IT ?
------------------------------------------------
Particles Analyser is a program , that will check collision between one Particles object to another one. Also, it shows distance beetween two Particles and you can see how far they are from each other.
------------------------------------------------
HOW TO USE IT ?
------------------------------------------------
Touch your screen to create a new Particles objects. Its radius is random. And its gravity is depending of its radius . 
#bigger ---> lower gravity
------------------------------------------------
HOW DOES IT WORK ?
------------------------------------------------
There is a class of Particles, that creates a Particles object with x_coord, y_coord, r_radius, g_gravity and cv the Canvas where the object should be drawn.
Actually , I make the gravity a constant because I wanted an infinite render. But normally, the gravity should decrease to respect "PHYSIC'S RULES".
So we should have _gravity=-gravity*0.9_ 
# if we use "AIR DENSITY=.9" (density should be <1 and >0)
------------------------------------------------
THANKS FOR READING !
/{% blockquote DerSon, myquote %}
D3R50N👤
{% endblockquote %}
------------------------------------------------