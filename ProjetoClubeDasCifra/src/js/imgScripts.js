function storeTheImage() {
    var imgCanvas = document.getElementById('canvas-element'),
        imgContext = imgCanvas.getContext("2d");

    var img = document.getElementById('image-preview');
    // Make sure canvas is as big as the picture BUT make it half size to the file size is small enough
    imgCanvas.width = (img.width/4);
    imgCanvas.height = (img.height/4);

    // Draw image into canvas element
    imgContext.drawImage(img, 0, 0, (img.width/4), (img.height/4));

    // Get canvas contents as a data URL
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        window.localStorage.setItem("imageStore", imgAsDataURL);
        $('.localstorage-output').html( window.localStorage.getItem('imageStore') );
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image-preview').attr('src', e.target.result);
            storeTheImage();
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$('.file-input').on('change', function() {
    readURL(this);
});
