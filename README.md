# Waterbenders-Dallet
Hackaton 2020 entry for our 4-man team Waterbenders



# Theme of the contest:
Ne aflam cu totii in pandemie si in perioada asta realizam si resimtim cu totii cat de importanta este digitalizarea proceselor si a instrumentelor din jurul nostru. Din studii Eurostat se vede ca tarile nordice au cea mai buna interactiune cu zona digitala, mai ales cand vine vorba despre relatia cu statul. In cazul lor se pare ca frigul si conditiile meteo fac dificila deplasarea. Fie ca e acesta motivul sau ca ne gandim la incalzirea globala, exploatarea ineficienta a resurselor sau pur si simplu ca in era vitezei orice optimizare de timp ne salveaza si ne face mai eficienti, avem nevoie constant sa inovam si sa folosim tehnologia pentru a ne face viata mai usoara. Motto-ul Softbinator este “We build tech for humanity” si va invitam sa va alaturati misiunii noastre la  acest hackathon organizat de ASMI, o organizatie studenteasca draga noua si alaturi de care avem deja o istorie in ceea ce priveste colaborarea. Asadar, in contextul celor prezentate mai sus, ce aveti de construit este o aplicatie (web sau mobile) care sa automatizeze un proces/mai multe procese si sa salveze astfel fie utilizarea irationala de consumabile (ex hartie) sau timpul petrecut cu vizita anumitor locatii (ex institutii) sau pur si simplu sa ajute la interactiunea cat mai eficienta intre oameni sau om-dispozitive. Va conta foarte mult aplicabilitatea (atentie - este strans legata de simplicitate) si eficienta demonstrata pe bune pentru utilizatori.

# Our project idea:
Eficientizarea proceselor birocratice care presupun trimiterea unor acte printr-o aplicatie web capabila sa fie in acelasi timp un manager de documente prietenos.

Aplicatia web front-end este compusa din 3 pagini cu ajutorul la css/javascript/bootstrap. Utilizatorul se poate loga cu orice adresa de e-mail care este folosita ca identificator unic pe server; metode aditionale de securitate nu au fost inca implementate.

Aplicatia back-end este scrisa in django, cu baze de date in postgress, si este hostata separat de aplicatia front-end pe Microsoft Azure.

Pe pagina de upload, client-ul citeste fisiere PDF, pe care le converteste in fisiere text cu ajutorul a ConvertAPI si salvate intr-un URL. On submit, client-ul transmite la aplicatia back-end URL-ul fisierului si celelalte date completate de utilizator. Aplicatia back-end foloseste libraria TextRank (python) pentru a extrage keywords-urile din text, date salvate in baza de date postgress si folosite in clasificarea documentelor. Un pop-up in stanga jos notifica utilizatorul pe partea de front-end de viteza acestor procese si cand incarcarea de documente a fost finalizata.

Pe pagina de delivery, client-ul poate viziona intreaga lista de documente valide pe care le-a incarcat. Vizibile utilizatorului sunt numele documentului si data de expirare. Nevizibile utilizatorului sunt keywords-urile obtinute de algoritmul de Machine Learning din back-end, care sunt folosite insa la filtarea documentelor pe baza search bar-ului. Documentele care contin nume sau keywords cat mai apropiate de sirul de caractere introdus in search bar vor fi mai aproape de inceput, pe baza unui scor de asemanare intre string-uri. De asemenea, la apasarea butonului de "Deliver", utilizatorul poate introduce o adresa de e-mail, iar la apasarea butonului de "Submit", toate documentele selectate prin checkboxes vor fi arhivate si transmise la adresa de destinatie.

Aplicatia back-end ruleaza un script pe un thread dedicat care verifica daca alerta setata de un utilizator ar trebui activata si le trimite un e-mail in acest caz.

Github Pages URL: https://917-todasca-daniel.github.io/Waterbenders-Dallet/waterbenders/home.html
PPT Presentation: https://docs.google.com/presentation/d/19onWzpjombXX4YB9nwIptEGwYEg_lyZ0rADshMBEOcE/edit#slide=id.g571f33f51b_1_318


Credits:
Gabriela Tiperciuc
Eduard Pauliuc
Daniel Todasca
Robert Hostiuc
