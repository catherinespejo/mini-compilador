function generateJsForStatements(statements) {
    const lines = [];
    for (let statement of statements) {
        const line = generateJsForStatementOrExpr(statement);
        lines.push(line);
    }
    return lines.join("\n");
}

function generateJsForStatementOrExpr(node) {
    if (node.type === "var_assign") {
        const varName = node.var_name.value;
        const jsExpr = generateJsForStatementOrExpr(node.value);
        const js = `var ${varName} = ${jsExpr};`;
        return js;
    } else if (node.type === "fun_call") {
        let funName = node.fun_name.value;
        if (funName === "if") {
            funName = "$if";
        }
        const argList = node.arguments.map((arg) => {
            return generateJsForStatementOrExpr(arg);
        }).join(", ");
        return `${funName}(${argList})`;
    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "number") {
        return node.value;
    } else if (node.type === "identifier") {
        return node.value;
    } else if (node.type === "lambda") {
        const paramList = node.parameters
            .map(param => param.value)
            .join(", ");
        const jsBody = node.body.map((arg, i) => {
            const jsCode = generateJsForStatementOrExpr(arg);
            if (i === node.body.length - 1) {
                return "return " + jsCode;
            } else {
                return jsCode;
            }
        }).join(";\n");
        return `function (${paramList}) {\n${indent(jsBody)}\n}`;
    } else if (node.type === "comment") {
        return "";
    } else {
        throw new Error(`Unhandled AST node type ${node.type}: ${JSON.stringify(node)}`);
    }
}

function indent(string) {
    return string.split("\n").map(line => "    " + line).join("\n");
}

module.exports = generateJsForStatements;
