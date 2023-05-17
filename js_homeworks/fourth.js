// developers - авторя ЯП
// name - имя автора
// work - род деятельности автора
const developers = [
    {
        index:0,
        name:"Брендан Эйх",
        work: "специалист в области информатики, программист, технический директор"
    },
    {
        index:2,
        name: "Джеймс Гослинг",
        work: "специалист в области информационных технологий"
    },
    {
        index:3,
        name: "Бьёрн Страуструп",
        work: "программист"
    }
]

// data - ЯП про которые должны быть рассказы
// name - название ЯП
// year - год выпуска ЯП
// filenameExtensions -расширения файлов
// influencedBy - ЯП оказавшие влияние
// affectedBy - ЯП испытавшие влияние ЯП
// developerIndex - уникальный идентификатор автора языка программирования
const data = [
    {
        name:"JavaScript",
        year: 1995,
        filenameExtensions: "js, mjs",
        influencedBy: ["AWK", "C", "HyperTalk", "Java", "Lua", "Perl", "Python", "Scheme", "Self"],
        affectedBy: ["ActionScript", "AtScript", "CoffeeScript", "Dart", "JScript .NET", "LiveScript", "Objective-J", "Opa", "QML", "Raku", "TypeScript"],
        developerIndex:0,
    },
    {
        name:"Java",
        year: 1995,
        filenameExtensions: "java, class, jar, jad, jmod",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada 2005", "BeanShell", "C#", "Chapel", "Clojure", "ECMAScript", "Fantom", "Gambas", "Groovy", "Hack", "Haxe", "J#", "Kotlin", "PHP", "Python", "Scala", "Seed7", "Vala"],
        developerIndex: 2,
    },
    {
        name:"C++",
        year: 1983,
        filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada", "C", "Modula-2", "Simula"],
        developerIndex: 3,
    },
];


const listOfFilenameExtensions = (listOfExtensions) => {
    if (typeof listOfExtensions === "string") {
        return listOfExtensions.split(", ").map((item) => {
        return `.${item}`;
        }).join(", ");
    }
}

const listOfLanguagesAffectedBy = (listOfLanguages) => {
    if (Array.isArray(listOfLanguages)) {
        if(listOfLanguages.length > 4) {
            let result = listOfLanguages.slice(0, 4).join(", ") + " и другие языки программирования";
            return result;
        }
        return listOfLanguages.join(", ");
    }
}

let dataForStories = data.map(e => ({
    name: e.name,
    year: e.year,
    filenameExtensions: listOfFilenameExtensions(e.filenameExtensions),
    influencedBy: e.influencedBy,
    affectedBy: listOfLanguagesAffectedBy(e.affectedBy),
    developer: developers.find(item => item.index === e.developerIndex)
}));

const stories = (data) => {
    data.forEach(e => {
        console.log(`${e.name} - язык программирования выпущенный в ${e.year} году. 
        Автором языка стал ${e.developer.name} - ${e.developer.work}.
        Файл программ, написаных на ${e.name}, могут иметь расширения ${e.filenameExtensions}.
        ${e.name} испытал влияние ${e.influencedBy.length} языков программирования: ${e.influencedBy.join(", ")}.
        ${e.name} повлиял на ${e.affectedBy}.`);
    });
};

console.log("Информация будет выведена через 10 секунд");    

let counterOfTime = 10;
let loadingStories = setInterval(() => {
    --counterOfTime;
    console.log(`${counterOfTime} Ожидание...`); 
    if(counterOfTime === 0) {
        clearInterval(loadingStories);
    }
}, 1000);

setTimeout(stories, 10000, dataForStories);