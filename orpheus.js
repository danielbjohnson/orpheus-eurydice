
async function prints(text){
    var targetElement=document.createElement('p');
    document.querySelector("main").appendChild(targetElement);
    var i=0;
    await typewriter(targetElement,text,i);
    //targetElement.append(text);
}

function typewriter(targetElement,text,i) {
        if (i < text.length) {
            targetElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(()=>{typewriter(targetElement,text,i)}, 30);
        }
}

function input(buttonA,buttonB){
    return new Promise ((resolve) => {
        buttonA.addEventListener('click', ()=>{resolve("A");}, {once:true});
        buttonB.addEventListener('click',()=>{resolve("B");},{once:true});
    });

}

async function make_choice(optionA,optionB){
    var buttonA=document.createElement('button');
    var buttonB=document.createElement('button');
    buttonA.textContent=optionA;
    buttonB.textContent=optionB;
    buttonA.classList.add("buttonA")
    buttonB.classList.add("buttonB")
    document.querySelector("main").appendChild(buttonA);
    document.querySelector("main").appendChild(buttonB);
    var thisuserChoice = await input(buttonA,buttonB);
    buttonA.remove();
    buttonB.remove();
    return thisuserChoice
}

async function next_scene(){
    var buttonC = document.createElement('button');
    buttonC.textContent="Continue";
    buttonC.classList.add("buttonC")
    document.querySelector("main").appendChild(buttonC);
    await input(buttonC, buttonC);
    buttonC.remove();
}

async function play_scene(scene){
    switch (scene){
        case "SNAKEBITE":
            prints("You sit on the forest floor, your dead wife lying still in your arms. Her skin is deathly pale, save for the purple bite marks on her ankle. Heart breaking in pieces, you sing your lament. The world cries with you, but no amount of tears will bring back Eurydice. Do you accept her death, or do you walk against nature itself to bring her back?");
            var userChoice = await make_choice("Accept her death", "Bring her back");
            if (userChoice == "A"){
                play_scene("PYRE");
            } else if (userChoice =="B"){
                play_scene("DESCENT");
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("SNAKEBITE");
            }
            break;
        case "PYRE":
            prints("Every night you try to sleep, just to see your wife's funeral pyre roar in front of you again. Over and over again, you hear the crackling as she turns to ash. Every night, long after the fire has burned out, you sit there, watching. Eurydice was the light of your life, the muse of your music. Is life worth living without her? You wake up and stare at the ground at your feet. One way or another, you will be reunited with Eurydice. Never again will you be separated. Do you take your own life to join her in death, or do you push against the rules of your world to find her again in life?");
            userChoice = await make_choice("Join her in death", "Find her in life");
            if (userChoice == "A"){
                play_scene("ATTEMPT");
            } else if (userChoice == "B") {
                play_scene("DESCENT");
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("PYRE");
            }
            break;
        case "ATTEMPT":
            prints("Without Eurydice, your life is not worth living. You sing your pain to the vines around you, begging them to end your life. The vines wrap around your neck, but they cannot bring themselves to squeeze away your music, haunted as it may be. You stop singing. If you cannot join Eurydice, you will bring her back to you.")
            await next_scene();
            play_scene("DESCENT")
            break;
        case "DESCENT":
            prints("You stand at the maw of a deep, dark cave. You strain to see into its depths, but you are met with nothing. No breeze flowing, no animals scratching, no light penetrating. You steel your heart; armed only with your trusted lyre, you set forth into the Underworld. You walk through the emptiness for what feels like years, your need for Eurydice being the only thing keeping you from losing your mind in terror. Finally, a sound breaks through the silence: water, lapping against the banks of a river. You step forward to find Charon, ferryman of the River Styx. To ferry you across the river into the Underworld, he demands payment- but you have no coins to give him. Do you sing for him, or do you try to steal his boat?");
            //global boatFeeling
            userChoice = await make_choice("Sing for him","Steal his boat");
            if (userChoice == "A"){
                play_scene("BOAT SONG")
            } else if (userChoice == "B") {
                play_scene("BOAT THIEF")
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("DESCENT");
            }
            break;
        case "BOAT SONG":
            prints("You strum your lyre and sing to Charon. His heart, long grown cold to the cries of the dead, is moved by the strength of your love and life. He allows you to step into his rowboat, and he carries you across the river into the Underworld.")
            boatFeeling = "impressed";
            await next_scene();
            play_scene("CERBERUS")
            break;
        case "BOAT THIEF":
            prints("With an aching heart and empty pockets, you are desperate to reach Eurydice. You slip past Charon - after millennia of dealing with the dead, he is unaccustomed to the speed of the living - and jump in his rowboat, rowing furiously to the other side. As he grows smaller and smaller, you see Charon shake his head disapprovingly at you.")
            boatFeeling = "stole from";
            await next_scene();
            play_scene("CERBERUS")
            break;
        case "CERBERUS":
            prints("You set foot on land again, looking around at the bleak, dead landscape around you. Withered crops and piles of bones litter the ground around you, which makes it hard to ignore when the earth begins rumbling beneath you. You hear dogs barking, and a terrible stench fills the air. Before you can even think about running, the Hound of Hades has approached you and trapped you under its heavy paw. Cerberus's three heads slobber and snap at you. Do you try to sing to him, or do you throw your lyre as a distraction?");
            //global dogFeeling
            userChoice = await make_choice("Sing to him","Throw your lyre");
            if (userChoice == "A") {
                play_scene("DOG SONG");
            } else if (userChoice=="B"){
                play_scene("DOG FETCH");
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("CERBERUS");
            }
            break;
        case "DOG SONG":
            prints("It is hard to get breath out with Cerberus's heavy paw on your chest, but you try anyway. The great beast cocks its heads in confusion as it hears the first notes. Slowly lowering its hackles and stepping off your chest, Cerberus watches as you stand, singing all the while. It closes its eyes and lies down, leaving you free to move deeper forth into the Underworld.")
            dogFeeling = "soothed";
            await next_scene();
            play_scene("PALACE");
            break;
        case "DOG FETCH":
            prints("Your chest may be held down by Cerberus, but your hand is still free. It hurts your heart to part with your instrument, but it hurts far more to be separated from Eurydice. You toss your lyre to the side, hoping for the great beast to take an interest in it. It makes a sorry sound as it hits the floor, a broken chord as its strings snap. Your small sacrifice is successful, and as Cerberus jumps off you to investigate the thrown instrument, you hurry forth deeper into the Underworld.")
            dogFeeling = "distracted";
            await next_scene();
            play_scene("PALACE");
            break;
        case "PALACE":
            prints("Walking through the Underworld is not a solitary journey. Some souls watch listlessly as you walk by. Some are attracted to your life like moths to a flame, following behind as you walk. Some look at you with pain and rage, unable to understand why the living would ever come to this place before their time. You look desperately for your wife's face, but she is nowhere to be found. As you start to doubt if you can take even one more step, a dark palace looms before you. You approach it with new vigor- what could this be but the home of Hades? Hiding near the gates, you consider your options. Do you openly walk in to persuade Hades to let Eurydice leave the Underworld, or do you sneak in and try to find her?");
            userChoice = await make_choice("Openly walk in","Sneak in");
            if (userChoice == "A"){
                play_scene("HADES")
            } else if (userChoice=="B") {
                play_scene("SNEAK")
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("PALACE");
            }
            break;
        case "SNEAK":
            prints("You cannot rely on Hades agreeing to release your wife, so you must find her yourself. Sneaking around to the back of the castle, you find a small crack in the otherwise impenetrable walls. You squeeze through it and begin searching through the castle for any clues to where the newly dead might be. But in your haste, you have forgotten about the horde of souls following you. The surge of souls at the walls alert the palace guards to your presence, and it isn't long before skeleton hands are dragging you to face Hades.")
            await next_scene();
            play_scene("HADES");
            break;
        case "HADES":
            HadesText = "The god of death is not what you expected. His throne room is not a lavish one, just a simple chair in a dimly lit room. Hades is an old man, but there is a fire in his eyes as he regards you. Before you have a chance to open your mouth, he speaks. 'You " + boatFeeling + " my ferryman and you " + dogFeeling + " my dog. Clearly you came here with a purpose. What do the living want in the land of the dead?' Do you lie to Hades, or do you tell him the truth?"; 
            prints(HadesText);
            userChoice= await make_choice("Lie to Hades","Tell the truth");
            if (userChoice == "A"){
                play_scene("LIES")
            } else if (userChoice=="B") {
                play_scene("TRUTH")
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("HADES");
            }
            break;
        case "LIES":
            prints("For millennia, the dead have stayed dead- why would Hades change his mind now? If you want to see Eurydice again, you must lie about your true intentions and wait for an opportunity to bring her back yourself. You tell Hades that you are a musician looking to write songs about the land that no living person has ever sung about. You're starting to get into the act when Hades' eyes flash in anger and he stands up. He is the god of the Underworld- he knows all about death, and he senses your deceit. Insulted by your lies, Hades orders you thrown in the palace dungeons. The guards grab you again, but you push them aside and beg Hades to hear your truth.")
            await next_scene();
            play_scene("TRUTH")
            break;
        case "TRUTH":
            prints("You step forward and sing to Hades about Eurydice. Your voice takes on all the love you hold for her, all the pain of having lost her, and all the determination to bring her home. Before you met Eurydice, your song was beautiful. With her entrance into your life, your song has become a living thing of its own, hanging in the air with a passion unlike anything this world has ever seen. Tears flow freely down your cheeks as you finish your song.");
            await next_scene();
            play_scene("TERMS");
            break;
        case "TERMS":
            prints("The god of the Underworld has an unreadable expression on his face. Moved by a love he has not seen in ages, he offers you a chance to break the rules of death. You must make the long walk out of the Underworld while Eurydice follows behind you. If your love is true, you will trust that she is following without ever having to check. If the two of you return to the surface without you ever turning around to look for her, Eurydice will be returned to life. If at any point before that, you turn to see her- she will return to the Underworld forever. Do you accept his offer, or will you live your life alone?");
            userChoice= await make_choice("Accept","Decline");
            if (userChoice == "A"){
                play_scene("ASCENT")
            } else if (userChoice == "B") {
                play_scene("PYRE")
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("TERMS");
            }
            break;
        case "ASCENT":
            prints("Hades leads you to a narrow opening in a rock wall. Through it, a path slopes gradually upward in complete darkness, eventually leading to the surface world. You walk on, confident that you will soon be reunited with the love of your life. You strain your ears to hear any sign of Eurydice following behind you- you find nothing, but you trust that she is there. You walk on, towards your future with your wife.")
            await next_scene();
            play_scene("QUESTIONS");
            break;
        case "QUESTIONS":
            prints("The steps start adding up, and you are gasping for breath as you continue up the slope. Behind you, you still hear nothing. A sliver of doubt begins to twist in your mind. Was Hades telling the truth? Is he really letting her follow behind you? You try to push the questions away, but they only come back louder. Have you come all this way to the Underworld, just to blindly leave without your wife? Is she still down there, waiting for you to save her as you walk further and further away? The pressure builds. Do you check behind you, just for a moment, to see if your wife follows, or do you continue to walk?");
            userChoice=await make_choice("Check behind","Continue to walk");
            if (userChoice == "A") {
                play_scene("TURN");
            } else if (userChoice=="B") {
                play_scene("MADNESS");
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("QUESTIONS");
            }
            break;
        case "MADNESS":
            prints("You keep walking- you know you must not turn back. Ahead, you see the first glimmer of light, your first hope of emerging from this wretched place. You must not turn back. You pick up the pace, desperate to escape the questions, desperate to escape the sounds, desperate to be with your wife. You must not turn back, you must not turn back, turn back, you must not turn back, turn back, you must not, turn back turn back turn back, you must not turn back. Do you turn back, or do you continue to walk?")
            userChoice= await make_choice("Turn back","Continue to walk");
            if (userChoice == "A") {
                play_scene("TURN")
            } else if (userChoice=="B") {
                play_scene("STUMBLE")
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("MADNESS");
            }
            break;
        case "STUMBLE":
            prints("You try to quiet the voices crowding your head, needing to get to the surface for Eurydice. Your future together is finally within reach- you just need to keep walking forwards. That deathly silence behind you makes you nervous, but you must trust in your wife and in Hades. Suddenly, you hear gravel slide as someone stumbles and falls behind you. Eurydice! Do you reach behind to help her up, or do you continue to walk?");
            userChoice=await make_choice("Help her up","Continue to walk");
            if (userChoice == "A") {
                play_scene("TURN")
            } else if (userChoice=="B"){
                play_scene("EMERGENCE")
            } else {
                prints("Something went wrong. Let's try that again.");
                play_scene("STUMBLE");
            }
            break;
        case "EMERGENCE":
            prints("It hurts your heart to keep walking when your wife is on the ground behind you, but you must. She follows, she follows, she follows, you remind yourself. The glimmer of light turns into a full opening- just a little further, and you'll be able to see your wife again. Your excitement builds. This is it, this is the end. You leap through the opening and spin around to hold your beloved again. You freeze. You made it out of the Underworld, but Eurydice- Eurydice was just a few steps behind. Her feet still stand in the Underworld.")
            await next_scene();
            play_scene("LOSS");
            break;
        case "TURN":
            prints("You can't help it- you need to know if your wife is there, you need to help her continue on. Your song has swayed so many, but you cannot sway yourself. Against your better judgment, with all the pain and love in your heart, you turn around.")
            await next_scene();
            play_scene("LOSS")
            break;
        case "LOSS":
            prints("Eurydice is radiant, the spirit of all that is good and beautiful. She's been there all along, as you knew she would be. You fall to your knees in front of her, both in worship and defeat. Your wife smiles at you softly with nothing but love in her eyes. She fades, returning to the land of Hades. You lie there, alone once more.")
            await next_scene();
            play_scene("SUICIDE")
            break;
        case "SUICIDE":
            prints("You are broken as you have never been broken before. Not once, but twice, you have lost your wife. There is only one way to return to her now. You sing again, for the last time- and your voice carries an agony so piercing that the whole world stops to listen. The trees cry, and the stones whimper. Your song is so painful that the vines around you coil around your arms and legs and neck, choking out your haunted sound and pulling you into the nearby river. You will never see Eurydice again in life. But in death, you will be together forever.")
            document.querySelector('footer').style.display="block";
            break;
    }
}

var boatFeeling
var dogFeeling
var HadesText
//var userChoice

const resize_ob = new ResizeObserver((entries) => {window.scrollTo(0, document.body.scrollHeight);})
resize_ob.observe(document.querySelector("main"));

var startButton=document.getElementById('start');
startButton.addEventListener("click",() => {play_scene("SNAKEBITE")});
