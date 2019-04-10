const NUM_OF_PAGES = 200;
const NUM_OF_STATES = 50;

const fs = require('fs');

fs.mkdirSync('src/generated');
generateRootEnum(NUM_OF_PAGES);
for (let i = 0; i < NUM_OF_PAGES; ++i) {
    fs.mkdirSync(`src/generated/page${i}`);
    generateStateEnum(i, NUM_OF_STATES);
    for (let j = 0; j < NUM_OF_STATES; ++j) {
        generateClass(i, j);
    }
}

function generateClass(i, j) {
    const content = 
`package generated.page${i};

import generated.State;
import haxe.ds.Option;

class Parameter${j} {
    public var field0: Int = 0;
    public var field1: Int = 0;
    public var field2: Int = 0;
    public var field3: Int = 0;
    public var field4: Int = 0;
    public var field5: Int = 0;
    public var field6: Int = 0;
    public var field7: Int = 0;
    public var field8: Int = 0;
    public var field9: Int = 0;
    public var state: Option<State> = None;

    public function new() {
    }

    public function foo(): String {
        return "foo";
    }

    public function bar(): String {
        return "bar";
    }

    public function baz(): String {
        return "baz";
    }
}
`;
    fs.writeFileSync(`src/generated/page${i}/Parameter${j}.hx`, content, { encoding: 'utf-8' });
}

function generateRootEnum(count) {
    const imports = [];
    const values = [];
    for (let i = 0; i < count; ++i) {
        imports.push(`import generated.page${i}.PageState${i};`);
        values.push(`    Page${i}(x: PageState${i});`);
    }

    const content=
`package generated;
${imports.join("\r\n")}

enum State {
${values.join("\r\n")}
}
`;

    fs.writeFileSync(`src/generated/State.hx`, content, { encoding: 'utf-8' });
}

function generateStateEnum(page, count) {
    var values = [];
    for (let i = 0; i < count; ++i) {
        values.push(`    Item${i}(x: Parameter${i});`);
    }

    const content=
`package generated.page${page};

enum PageState${page} {
${values.join("\r\n")}
}
`;

    fs.writeFileSync(`src/generated/page${page}/PageState${page}.hx`, content, { encoding: 'utf-8' });
}