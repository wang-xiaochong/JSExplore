function b() {
    setTimeout(() => {
        a();
    }, 2000);

    console.log("b.js")
}