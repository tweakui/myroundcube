function rcmail_editor_init(a){var b={script_url:"plugins/tinymce/tiny_mce/tiny_mce_gzip.php",mode:"textareas",editor_selector:"mce_editor",apply_source_formatting:!0,theme:"advanced",language:a.lang,content_css:a.skin_path+"/editor_content.css",theme_advanced_toolbar_location:"top",theme_advanced_toolbar_align:"left",theme_advanced_buttons3:"",extended_valid_elements:"font[face|size|color|style],span[id|class|align|style]",relative_urls:!1,remove_script_host:!1,gecko_spellcheck:!0,convert_urls:!1,
external_image_list:window.rcmail_editor_images,rc_client:rcmail};"identity"==a.mode?$.extend(b,{plugins:eval(rcmail.env.tinymce_plugins_identity),theme_advanced_buttons1:eval(rcmail.env.tinymce_buttons_identity_row1),theme_advanced_buttons2:eval(rcmail.env.tinymce_buttons_identity_row2)}):($.extend(b,{plugins:eval(rcmail.env.tinymce_plugins_compose),theme_advanced_buttons1:eval(rcmail.env.tinymce_buttons_compose_row1),theme_advanced_buttons2:eval(rcmail.env.tinymce_buttons_compose_row2),spellchecker_languages:rcmail.env.spellcheck_langs?
rcmail.env.spellcheck_langs:"Dansk=da,Deutsch=de,+English=en,Espanol=es,Francais=fr,Italiano=it,Nederlands=nl,Polski=pl,Portugues=pt,Suomi=fi,Svenska=sv",spellchecker_rpc_url:"?_task=utils&_action=spell_html",spellchecker_enable_learn_rpc:a.spelldict,accessibility_focus:!1,oninit:"rcmail_editor_callback"}),b.setup=function(a){a.onSetProgressState.add(function(a,b){b||rcmail.spellcheck_state()})});window.rcmail_editor_settings&&$.extend(b,window.rcmail_editor_settings);window.rcmail_editor_settings=
b;if($("textarea.mce_editor").get(0)){rcmail.env.tinymce_initialized=!0;try{$("textarea.mce_editor").tinymce(b)}catch(c){tinyMCE.init(b)}}}
rcmail.toggle_editor=function(a){rcmail.stop_spellchecking();if("html"==a.mode)rcmail.plain2html($("#"+a.id).val(),a.id),rcmail.env.tinymce_initialized?tinyMCE.execCommand("mceAddControl",!1,a.id):($("#"+a.id).addClass("mce_editor"),$("textarea.mce_editor").get(0)&&($("textarea.mce_editor").tinymce?$("textarea.mce_editor").tinymce(window.rcmail_editor_settings):tinyMCE.init(window.rcmail_editor_settings))),rcmail.env.default_font&&setTimeout(function(){$(tinyMCE.get(a.id).getBody()).css("font-family",
rcmail.env.default_font)},500);else{var b;if(b=tinyMCE.get(a.id).getContent()){if(!confirm(rcmail.get_label("editorwarning")))return!1;rcmail.html2plain(b,a.id)}tinyMCE.execCommand("mceRemoveControl",!1,a.id)}};function rcmail_editor_images(){var a,b=rcmail.env.attachments,c=[];for(a in b)att=b[a],att.complete&&0==att.mimetype.indexOf("image/")&&c.push([att.name,rcmail.env.comm_path+"&_action=display-attachment&_file="+a+"&_id="+rcmail.env.compose_id]);return c};