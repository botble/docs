# Usage

### Integrate with Ckeditor

\- Prepare HTML

```html
<textare name="content" id="editor"></textare>
```

\- Ckeditor config

```javascript
var config = {
    filebrowserImageBrowseUrl: 'http://your-domain-app.com/media/?media-action=select-files&method=ckeditor&type=image',
    filebrowserImageUploadUrl: 'http://your-domain-app.com/media?method=ckeditor&type=image&_token=' + $('meta[name="csrf-token"]').attr('content'),
    filebrowserWindowWidth: '768',
    filebrowserWindowHeight: '500',
    height: 356,
    allowedContent: true
};
var mergeConfig = {};
$.extend(mergeConfig, config, extraConfig);
CKEDITOR.replace('editor', mergeConfig);
```

You need to add `<meta name="csrf-token" content="{{ csrf_token() }}">` to header of your layout if it's not exists.

### TinyMCE

\- Prepare HTML

```html
<textare name="content" id="editor"></textare>

<iframe id="form_target" name="form_target" style="display:none"></iframe>
<form id="my_form" action="{{ route('media.files.upload.from.editor') }}" target="form_target" method="post" enctype="multipart/form-data" style="width:0;height:0;overflow:hidden;display: none;">
    {{ csrf_field() }}
    <input name="upload" id="upload_file" type="file" onchange="$('#my_form').submit();this.value='';">
    <input type="hidden" value="tinymce" name="upload_type">
</form>
```

\- TinyMCE config

```javascript
tinymce.init({
    menubar: false,
    selector:'#editor',
    skin: 'voyager',
    min_height: 600,
    resize: 'vertical',
    plugins: 'link, image, code, youtube, giphy, table, textcolor',
    extended_valid_elements : 'input[id|name|value|type|class|style|required|placeholder|autocomplete|onclick]',
    file_browser_callback: function(field_name, url, type, win) {
        if (type =='image') {
            $('#upload_file').trigger('click');
        }
    },
    toolbar: 'styleselect bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | link image table youtube giphy | code',
    convert_urls: false,
    image_caption: true,
    image_title: true
});
```


### Standard alone button

\- Sample HTML:
```html
<input type="text" name="file" class="input-file">
<a class="btn_gallery">Choose file</a>
```
\- JS:

```javascript
if (jQuery().rvMedia) {

    $('.btn_gallery').rvMedia({
        multiple: false,
        onSelectFiles: function (files, $el) {
            var firstItem = _.first(files);
            $('.input-file').val(firstItem.url);
        }
    });
}
```