export default interface CodeExecuterStrategy{
    execute(
        code:string,
        inputTestCase:string,
    ):Promise<string>;
}