function enter(handler) {
    if (handler.id === mathField[mathField.length - 1].id) {
        insertMath();
        mathField[mathField.length - 1].focus();
    } else {
        for (let field = 0; field < mathField.length; field++) {
            if (mathField[field].id === handler.id) {
                mathField[field + 1].focus();
            }
        }
    }
}

function removeField(thisField) {
    for (let field = 0; field < mathField.length; field++) {
        if (mathField[field].id === thisField.id) {
            mathField[field].revert().html();
            mathField.splice(field,1);
        }
    }
}

function up(thisField) {
    if (thisField.id != mathField[0].id) {
        for (let field = 0; field < mathField.length; field++) {
            if (mathField[field].id === thisField.id) {
                mathField[field - 1].focus();
            }
        }
    }
}

function down(thisField) {
    if (thisField.id != mathField[mathField.length - 1].id) {
        for (let field = 0; field < mathField.length; field++) {
            if (mathField[field].id === thisField.id) {
                mathField[field + 1].focus();
            }
        }
    }
}

function move(direction, thisField) {
    if (direction === MQ.L) {
        if (thisField.id != mathField[0].id) {
            for (let field = 0; field < mathField.length; field++) {
                if (mathField[field].id === thisField.id) {
                    mathField[field - 1].focus();
                    mathField[field - 1].moveToDirEnd(-direction);
                }
            }
        }
    } else if (direction == MQ.R) {
        if (thisField.id != mathField[mathField.length - 1].id) {
            for (let field = 0; field < mathField.length; field++) {
                if (mathField[field].id === thisField.id) {
                    mathField[field + 1].focus();
                    mathField[field + 1].moveToDirEnd(-direction);
                }
            }
        }
    } else return;
}

function del(thisField) {
    if (thisField.id != mathField[0].id) {
        for (let field = 0; field < mathField.length; field++) {
            if (mathField[field].id === thisField.id) {
                mathField[field - 1].focus();
                mathField[field - 1].moveToDirEnd(MQ.R);
            }
        }
    }
    
    if (thisField.latex() === "") {
        for (let field = 0; field < mathField.length; field++) {
            if (mathField[field].id === thisField.id) {
                if (thisField.id != mathField[0].id) {
                    mathField[field - 1].focus();
                    removeField(thisField);
                } else if (thisField.id != mathField[mathField.length-1].id) {
                    mathField[field + 1].focus();
                    removeField(thisField);
                } else continue;
            }
        }
    }
}

var mathHandler = {handlers: {
    enter: (handler) => enter(handler),
    deleteOutOf: (direction, thisField) => del(thisField),
    downOutOf: (thisField) => down(thisField),
    upOutOf: (thisField) => up(thisField)
}}

function insertMath() {

    var new_field = document.createElement("SPAN");
    new_field.className = "math-editor";
    
    var mathEditor = document.getElementById("math-container");
    mathEditor.appendChild(new_field);

    mathField.push(MQ.MathField(mathEditor.lastChild, {
        autoCommands: "pi theta sqrt nthroot",
        handlers: {
        enter: (handler) => enter(handler),
        deleteOutOf: (direction, thisField) => del(thisField),
        downOutOf: (thisField) => down(thisField),
        upOutOf: (thisField) => up(thisField),
        moveOutOf: (direction, thisField) => move(direction, thisField)
    }} ));
}