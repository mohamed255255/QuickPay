function show(className){
    var elements = document.getElementsByClassName(className);
    var element = elements[0];
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    }else{
        element.style.display = 'none';
    }
}