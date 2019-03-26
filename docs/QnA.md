# Questions and answers

__q:__ Why did you build this?

__a:__ Because I found myself having trouble with remembering passwords, personal passwords, but also up to 6 passwords per project up to 6 projects a year. I also started reusing passwords which of course is a bad idea, so I wrote this.

__q:__ Why use a passwordmanager?

__a:__ If you write down passwords, or store them in a text file, attackers can easilly get your passwords.
Also if you create your own password you are susceptible to social engineering,
you could use diceware, but that doesnt have as many bits of entropy as a random password would have.
Also diceware passwords and passphrases are suspectible to dictionary attacks. And on top of that there are many
rainbowtables available for common passwords. A password manager fixes all of these problem.

__q:__ Why use this passwordmanager?

__a:__ This is one of the few password managers that [verifiable](VerifyNoInternet.md) uses no internet connection at all and completely runs locally.
This also is among the few that share how passwords are encrypted.

__q:__ How are my passwords stored?

__a:__ Please read [How are passwords stored?](HowArePasswordsStored.md)

__q:__ How to chose a password for my masterpassword?

__a:__ I recommend using [diceware](http://world.std.com/~reinhold/diceware.html), because that is easy to remember. __But__ I strongly recommend using some additions to
your password other then just a diceware string, add spaces, numbers and special characters at random places in your password.
Another good idea is to add a word from another language to your password.

__q:__ Why isn't this free?

__a:__ Because I had to write 2500 lines of code, fixed 50+ bugs and I had to write tests to prove it is all working to realise this, that costs a lot of time.

__q:__ How do you keep the quality of this project high?

__a:__ I use unit tests, [TSLint](https://www.npmjs.com/package/tslint), [SonarQube](https://www.sonarqube.org/) and a lot of manual testing to ensure good code quality.

__q:__ How can I support this project?

__a:__ Of course by using it, you pay for it, which is the main way to support me. If you want to do more donations are always welcome ;-)

In future releases I want to add translations for different languages, maybe you could help with translating to a language you know.

__q:__ I found a bug/error, where can I report it?

__a:__ Please mail to [EKVaultManager@gmail.com](mailto:EKVaultManager@gmail.com).