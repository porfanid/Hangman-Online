var greek_alphabet = "Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω";
var english_alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
var alphabet;
function baseName(str) {
            var base = new String(str).substring(str.lastIndexOf('/') + 1);
            if (base.lastIndexOf(".") != -1)
                base = base.substring(0, base.lastIndexOf("."));
            return base;
        }

        function refresh_view(first_word, letter_dict) {
            var has_won = true;
            var word = "";
            console.log("Inserting into the refresh view function");
            for (var letter in first_word.split('')) {
                console.log(letter);
                if (letter_dict[first_word[letter]]) {
                    word += first_word[letter] + " ";
                } else {
                    has_won = false;
                    word += "_ ";
                }
            }
            return [word, has_won];
        }



        $("#word").submit(function(e) {
            console.log("Function is running");
            e.preventDefault();
            const word = e.target[0].value.replace(/Ά|Α|ά/g, 'α').replace(/Έ|Ε|έ/g, 'ε').replace(/Ή|Η|ή/g, 'η').replace(/Ύ|υ|ύ/g, 'υ').replace(/Ώ|ω|ώ/g, 'ω').toUpperCase();
            const show_word = {};
            word.split("").forEach((letter, index) => {
                if(greek_alphabet.includes(letter)){
                    alphabet=greek_alphabet;
                }else{
                    alphabet=english_alphabet;
                }
                show_word[letter] = false;
            });


            console.log("Just before the first refresh of the hangman");
            console.log(word);
            document.getElementById("hangman-word-hidden").innerText = refresh_view(word, show_word)[0];

            document.getElementById("word-input").style.display = "none";

            const lettersList = document.getElementById("letters");
            alphabet.split(" ").forEach((index, letter) => {
                const spanElement = document.createElement("span");
                const text = document.createTextNode(index);
                spanElement.appendChild(text);
                spanElement.id = index;
                spanElement.style.cursor = "pointer";
                spanElement.onclick = () => {
                    if (document.getElementById(index).classList.contains("wrong")) {
                        return;
                    }
                    if (word.includes(index)) {
                        show_word[index] = true;

                        console.log("The user has pressed a correct letter.");
                        console.log(index + " : " + show_word[index]);

                        const data = refresh_view(word, show_word);
                        document.getElementById("hangman-word-hidden").innerText = data[0];
                        has_won = data[1];
                        if (has_won) {
                            if (global_lang === 'el') {
                                alert("Συγχαρητήρια!!! Βρήκατε την λέξη");
                            }else{
                                alert("Congratulations!!! You have found the word");
                            }
                            location.reload();
                            return;
                        }
                        return;
                    }

                    document.getElementById(index).classList.add("wrong");
                    const hangmanImage = document.getElementById("hangman-image");
                    const link = hangmanImage.src;
                    const nextImageIndex = parseInt(baseName(link)) + 1;

                    if (nextImageIndex == 10) {
                        if (global_lang === 'el') {
                            alert("Έχεις ακόμα μία προσπάθεια.");
                        }else{
                            alert("You can make one more attempt");
                        }
                    }

                    if (nextImageIndex > 10) {
                        if (global_lang === 'el') {
                            alert("Εχασες.");
                        }else{
                            alert("You have lost");
                        }
                        location.reload();
                        return;
                    }

                    const nextImage = nextImageIndex + ".jpg";
                    console.log(nextImage);
                    hangmanImage.src = "./hangman/" + nextImage;
                };
                lettersList.appendChild(spanElement);
                lettersList.appendChild(document.createTextNode(" "));
                //lettersList.appendChild(spaceElement.cloneNode());
            })
            document.getElementById("hangman").style.display = "block";
        });
