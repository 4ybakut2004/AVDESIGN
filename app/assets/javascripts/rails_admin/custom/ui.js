//= require ckeditor/init
//= require ckeditor/lang/ru
//= require ckeditor/config

// Для корректной работы HTML редактора
// (https://github.com/sferik/rails_admin/wiki/CKEditor)
$(document).ready(function() {
  return $(document).on('mousedown', '.save-action', function(e) {
    var editor, instance;
    for (instance in CKEDITOR.instances) {
      editor = CKEDITOR.instances[instance];
      if (editor.checkDirty()) {
        editor.updateElement();
      }
    }
    return true;
  });
});