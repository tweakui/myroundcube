rcube_webmail.prototype.contextmenu_command_handlers={};rcube_webmail.prototype.contextmenu_disable_multi="#reply #reply-all #reply-list #forward #forward-attachment #print #edit #viewsource #download #open #edit".split(" ");function rcm_contextmenu_update(){}
function rcm_contextmenu_init(b){$("#"+b).contextMenu({menu:"rcmContextMenu",submenu_delay:400},function(a,b,c){var d=(""+$(b).attr("id")).match(/rcmrow([a-z0-9\-_=]+)/i);if($(b)&&d){var h=rcmail.env.uid;if(1>=rcmail.message_list.selection.length||!rcmail.message_list.in_selection(d[1]))rcmail.env.uid=d[1];0<a.indexOf("#")&&(a=a.substr(a.indexOf("#")+1));cmd="read"==a||"unread"==a||"flagged"==a||"unflagged"==a?"mark":a;d=rcmail.commands[cmd];rcmail.enable_command(cmd,!0);if("function"==typeof rcmail.contextmenu_command_handlers[a])rcmail.contextmenu_command_handlers[a](a,
b,c);else if("string"==typeof rcmail.contextmenu_command_handlers[a])window[rcmail.contextmenu_command_handlers[a]](a,b,c);else switch(a){case "read":case "unread":case "flagged":case "unflagged":rcmail.command("mark",a,$(b));break;case "reply":case "reply-all":case "reply-list":case "forward":case "forward-attachment":case "print":case "download":case "edit":case "viewsource":composenewwindowcommandcaller(a,"",$(b));break;case "open":rcmail.command(a,"",rcube_find_object("rcm_open"));rcmail.sourcewin=
window.open(rcube_find_object("rcm_open").href);rcmail.sourcewin&&window.setTimeout(function(){rcmail.sourcewin.focus()},20);rcube_find_object("rcm_open").href="#open";break;case "delete":case "moveto":if("moveto"==a&&rcmail.env.rcm_destfolder==rcmail.env.mailbox)return;c=null;rcmail.env.uid&&(rcmail.message_list.in_selection(rcmail.env.uid)||(c=rcmail.message_list.get_selection(),rcmail.message_list.select_row(rcmail.env.uid)),rcmail.message_list.rows[rcmail.env.uid].has_children&&!rcmail.message_list.rows[rcmail.env.uid].expanded&&
rcmail.message_list.select_childs(rcmail.env.uid),rcmail.env.uid=null);rcmail.command(a,rcmail.env.rcm_destfolder,$(b));if(c){rcmail.message_list.clear_selection();for(var g in c)rcmail.message_list.select_row(c[g],CONTROL_KEY)}delete rcmail.env.rcm_destfolder}rcmail.enable_command(cmd,d);rcmail.env.uid=h}})}function rcm_set_dest_folder(b){rcmail.env.rcm_destfolder=b}
function rcm_contextmenu_register_command(b,a,e,c,d,h,g,i,f){i||(i=$("#rcmContextMenu"));f||(f=b);"string"!=typeof e?f=e.children("li"):(f=$("<li>").addClass(f),$("<a>").attr("href","#"+b).addClass("active").html("<span>"+rcmail.gettext(e)+"</span>").appendTo(f));rcmail.contextmenu_command_handlers[b]=a;c&&i.children("li."+c)&&g?(subMenu=i.children("li."+c),subMenu.addClass("submenu"),a=null,subMenu.children("a")&&!subMenu.hasClass("sublink")&&(subMenu.addClass("sublink"),a=$("<li>").addClass(c),
subMenu.children("a").clone().appendTo(a),subMenu.children("a").addClass("mainlink")),c=$("<ul>").addClass("toolbarmenu").appendTo(subMenu),a&&c.append(a),c.append(f)):c&&i.children("li."+c)?i.children("li."+c).before(f):i.append(f);"before"==d?f.addClass("separator_above"):"after"==d&&f.addClass("separator_below");h||(rcmail.contextmenu_disable_multi[rcmail.contextmenu_disable_multi.length]="#"+b)}
function rcm_foldermenu_init(){$("#mailboxlist li").contextMenu({menu:"rcmFolderMenu"},function(b,a,e){var c=(""+$(a).children("a").attr("onclick")).match(/.*rcmail.command\(["']list["'],\s*["']([^"']*)["'],\s*this\).*/i);if($(a)&&c){var c=c[1],d=0;if("readfolder"==b||"expunge"==b||"purge"==b){if(c==rcmail.env.mailbox)d=rcmail.env.messagecount;else if(0==rcmail.env.unread_counts[c]){var h=rcmail.set_busy(!0,"loading");querystring="_mbox="+urlencode(c);querystring+=(querystring?"&":"")+"_remote=1";
var g=rcmail.env.comm_path+"&_action=plugin.contextmenu.messagecount&"+querystring;console.log("HTTP POST: "+g);jQuery.ajax({url:g,dataType:"json",success:function(a){d=a.env.messagecount},async:!1});rcmail.set_busy(!1,null,h)}if(0==rcmail.env.unread_counts[c]&&0==d)return rcmail.display_message(rcmail.get_label("nomessagesfound"),"notice"),!1}0<b.indexOf("#")&&(b=b.substr(b.indexOf("#")+1));g=rcmail.commands[b];rcmail.enable_command(b,!0);if("function"==typeof rcmail.contextmenu_command_handlers[b])rcmail.contextmenu_command_handlers[b](b,
a,e);else if("string"==typeof rcmail.contextmenu_command_handlers[b])window[rcmail.contextmenu_command_handlers[b]](b,a,e);else switch(b){case "readfolder":h=rcmail.set_busy(!0,"loading");rcmail.http_request("plugin.contextmenu.readfolder","_mbox="+urlencode(c)+"&_cur="+rcmail.env.mailbox+"&_oact="+rcmail.env.action,h);break;case "expunge":rcmail.expunge_mailbox(c);break;case "purge":rcmail.purge_mailbox(c);break;case "collapseall":case "expandall":targetdiv="collapseall"==b?"expanded":"collapsed";
$("#mailboxlist div."+targetdiv).each(function(){var a=$(this),a=(""+$(a).attr("onclick")).match(/.*rcmail.command\(["']collapse-folder["'],\s*["']([^"']*)["']\).*/i);rcmail.collapse_folder(a[1])});break;case "openfolder":rcube_find_object("rcm_openfolder").href="?_task=mail&_mbox="+urlencode(c),rcmail.sourcewin=window.open(rcube_find_object("rcm_openfolder").href),rcmail.sourcewin&&window.setTimeout(function(){rcmail.sourcewin.focus()},20),rcube_find_object("rcm_openfolder").href="#openfolder"}rcmail.enable_command(b,
g)}})}
function rcm_update_options(b){if(b.hasClass("message")){$("#rcmContextMenu").disableContextMenuItems("#reply-list");var a=(""+$(b).attr("id")).match(/rcmrow([a-z0-9\-_=]+)/i);$(b)&&a&&(1<rcmail.message_list.selection.length&&rcmail.message_list.in_selection(a[1])?$("#rcmContextMenu").disableContextMenuItems(rcmail.contextmenu_disable_multi.join(",")):($("#rcmContextMenu").enableContextMenuItems(rcmail.contextmenu_disable_multi.join(",")),rcmail.env.messages[a[1]].ml||$("#rcmContextMenu").disableContextMenuItems("#reply-list")))}else b.hasClass("mailbox")?($("#rcmFolderMenu").disableContextMenuItems("#readfolder,#purge,#collapseall,#expandall"),
a=(""+$(b).children("a").attr("onclick")).match(/.*rcmail.command\(["']list["'],\s*["']([^"']*)["'],\s*this\).*/i),$(b)&&a&&(b=a[1],0<rcmail.env.unread_counts[b]&&$("#rcmFolderMenu").enableContextMenuItems("#readfolder"),(b==rcmail.env.trash_mailbox||b==rcmail.env.junk_mailbox||b.match("^"+RegExp.escape(rcmail.env.trash_mailbox)+RegExp.escape(rcmail.env.delimiter))||b.match("^"+RegExp.escape(rcmail.env.junk_mailbox)+RegExp.escape(rcmail.env.delimiter)))&&$("#rcmFolderMenu").enableContextMenuItems("#purge"),
0<$("#mailboxlist div.expanded").length&&$("#rcmFolderMenu").enableContextMenuItems("#collapseall"),0<$("#mailboxlist div.collapsed").length&&$("#rcmFolderMenu").enableContextMenuItems("#expandall"))):b.hasClass("addressbook")||b.hasClass("contactgroup")?($("#rcmGroupMenu").disableContextMenuItems("#group-create,#group-rename,#group-delete"),$(b).hasClass("contactgroup")&&$(b).children("a").attr("rel")?(a=$(b).children("a").attr("rel").match(/([A-Z0-9\-_]+):?([A-Z0-9\-_]+)?/i),rcmail.env.address_sources[a[1]].readonly||
(rcmail.name_input||$("#rcmGroupMenu").enableContextMenuItems("#group-rename"),$("#rcmGroupMenu").enableContextMenuItems("#group-delete"))):$(b).hasClass("addressbook")&&(a=$(b).attr("id").match(/rcmli([A-Z0-9\-_]+)/i),rcmail.env.address_sources[a[1]].readonly||$("#rcmGroupMenu").enableContextMenuItems("#group-create"))):"addressbook"==rcmail.env.task&&(a=(""+$(b).attr("id")).match(/rcmrow([a-z0-9\-_=]+)/i),$(b)&&a&&(1<rcmail.contact_list.selection.length&&rcmail.contact_list.in_selection(a[1])?$("#rcmAddressMenu").disableContextMenuItems(rcmail.contextmenu_disable_multi.join(",")):
$("#rcmAddressMenu").enableContextMenuItems(rcmail.contextmenu_disable_multi.join(",")),b=rcmail.env.source?rcmail.env.source:a[1].split("-",2)[1],rcmail.env.address_sources[b].readonly?$("#rcmAddressMenu").disableContextMenuItems("#edit,#delete"):$("#rcmAddressMenu").enableContextMenuItems("#edit,#delete")))}
function rcm_addressmenu_init(b){$("tr[id="+b+"]").contextMenu({menu:"rcmAddressMenu"},function(a,b,c){var d=(""+$(b).attr("id")).match(/rcmrow([a-z0-9\-_=]+)/i);if($(b)&&d){var h=rcmail.env.cid;if(1>=rcmail.contact_list.selection.length||!rcmail.contact_list.in_selection(d[1]))rcmail.env.cid=d[1];0<a.indexOf("#")&&(a=a.substr(a.indexOf("#")+1));cmd=a;var g=rcmail.commands[cmd];rcmail.enable_command(cmd,!0);if("function"==typeof rcmail.contextmenu_command_handlers[a])rcmail.contextmenu_command_handlers[a](a,
b,c);else if("string"==typeof rcmail.contextmenu_command_handlers[a])window[rcmail.contextmenu_command_handlers[a]](a,b,c);else switch(a){case "edit":rcmail.contact_list.select(rcmail.env.cid);clearTimeout(rcmail.preview_timer);rcmail.command(a,"",$(b));break;case "compose":case "delete":case "moveto":c=rcmail.env.source?rcmail.env.source:d[1].split("-",2)[1];if("moveto"==a&&(rcmail.env.rcm_destbook==c||rcmail.env.rcm_destgroup&&rcmail.env.contactfolders["G"+rcmail.env.rcm_destsource+rcmail.env.rcm_destgroup].id==
rcmail.env.group))return;c=null;rcmail.env.cid&&(rcmail.contact_list.in_selection(rcmail.env.cid)?rcmail.contact_list.get_single_selection()==rcmail.env.cid?rcmail.env.cid=null:(c=rcmail.contact_list.get_selection(),rcmail.contact_list.select(rcmail.env.cid)):(c=rcmail.contact_list.get_selection(),rcmail.contact_list.select(rcmail.env.cid)));"delete"==a&&(rcmail.env.cid=null);rcmail.drag_active=!0;rcmail.env.rcm_destgroup?rcmail.command(a,rcmail.env.contactfolders["G"+rcmail.env.rcm_destsource+rcmail.env.rcm_destgroup],
$(b)):rcmail.command(a,rcmail.env.contactfolders[rcmail.env.rcm_destsource],$(b));rcmail.drag_active=!1;if(c){rcmail.contact_list.clear_selection();for(var i in c)rcmail.contact_list.select_row(c[i],CONTROL_KEY)}rcmail.env.rcm_destbook=null;rcmail.env.rcm_destsource=null;rcmail.env.rcm_destgroup=null}rcmail.enable_command(cmd,g);rcmail.env.cid=h}})}function rcm_set_dest_book(b,a,e){rcmail.env.rcm_destbook=b;rcmail.env.rcm_destsource=a;rcmail.env.rcm_destgroup=e}
function rcm_groupmenu_init(b){$(b).contextMenu({menu:"rcmGroupMenu"},function(a,b,c){var d=$(b).children("a").attr("rel").match(/([A-Z0-9\-_]+):?([A-Z0-9\-_]+)?/i);if($(b)&&d){prev_group=rcmail.env.group;prev_source=rcmail.env.source;cur_source=d[1];cur_id=d[2]?d[2]:rcmail.env.group;rcmail.env.group=cur_id;rcmail.env.source=cur_source;0<a.indexOf("#")&&(a=a.substr(a.indexOf("#")+1));d=rcmail.commands[a];rcmail.enable_command(a,!0);if("function"==typeof rcmail.contextmenu_command_handlers[a])rcmail.contextmenu_command_handlers[a](a,
b,c);else if("string"==typeof rcmail.contextmenu_command_handlers[a])window[rcmail.contextmenu_command_handlers[a]](a,b,c);else switch(a){case "group-create":rcmail.command(a,"",$(b).children("a"));break;case "group-rename":rcmail.command(a,"",$(b).children("a"));rcmail.enable_command("listgroup",!0);rcmail.env.group=prev_group;rcmail.env.source=prev_source;prev_group=cur_id;prev_source=cur_source;rcmail.command("listgroup",{source:prev_source,id:prev_group},$(b).children("a"));rcmail.enable_command("listgroup",
!1);break;case "group-delete":rcmail.command(a,"",$(b).children("a"))}rcmail.enable_command(a,d);rcmail.env.group=prev_group;rcmail.env.source=prev_source}})}
function rcm_groupmenu_update(b,a){var e=a.source+a.id,e=e.replace(rcmail.identifier_expr,"_");switch(b){case "insert":var c=$("<a>").attr("id","rcm_contextgrps_G"+e).attr("href","#moveto").addClass("active").attr("onclick","rcm_set_dest_book('G"+e+"', '"+a.source+"','"+a.id+"')").html("<span>"+a.name+"</span>"),e=$("<li>").addClass("contactgroup").append(c),d=$("#rcm_contextaddr_"+a.source);$('a[id^="rcm_contextgrps_G"]').each(function(b,c){if(a.name.toUpperCase().trim()>=$(this).text().toUpperCase().trim())d=
$(c).parent();else return!1});$(e).insertAfter($(d));rcm_groupmenu_init(a.li);break;case "update":$("#rcm_contextgrps_G"+e).length&&(a.newid?(c=a.source+a.newid,c=c.replace(rcmail.identifier_expr,"_"),c=$("<a>").attr("id","rcm_contextgrps_G"+c).attr("href","#moveto").addClass("active").attr("onclick","rcm_set_dest_book('G"+c+"', '"+a.source+"','"+a.newid+"')").html("<span>"+a.name+"</span>"),$("#rcm_contextgrps_G"+e).replaceWith(c)):$("#rcm_contextgrps_G"+e).html("<span>"+a.name+"</span>"),row=$("#rcm_contextgrps_G"+
e).parent().clone(!0),$("#rcm_contextgrps_G"+e).parent().remove(),d=$("#rcm_contextaddr_"+a.source),$('a[id^="rcm_contextgrps_G"]').each(function(b,c){if(a.name.toUpperCase().trim()>=$(this).text().toUpperCase().trim())d=$(c).parent();else return false}),$(row).insertAfter($(d)));break;case "remove":$("#rcm_contextgrps_G"+e).length&&$("#rcm_contextgrps_G"+e).remove()}}
$(document).ready(function(){if(window.rcmail&&(0<$("#rcmContextMenu").length&&(rcmail.addEventListener("listupdate",function(){rcm_contextmenu_update()}),rcmail.addEventListener("insertrow",function(b){rcm_contextmenu_init(b.row.id)})),0<$("#rcmFolderMenu").length&&rcmail.add_onload("rcm_foldermenu_init();"),0<$("#rcmAddressMenu").length&&rcmail.addEventListener("insertrow",function(b){rcm_addressmenu_init(b.row.id)}),0<$("#rcmGroupMenu").length))rcmail.add_onload('rcm_groupmenu_init("#directorylist li");'),
rcmail.addEventListener("group_insert",function(b){rcm_groupmenu_update("insert",b)}),rcmail.addEventListener("group_update",function(b){rcm_groupmenu_update("update",b)}),rcmail.addEventListener("group_delete",function(b){rcm_groupmenu_update("remove",b)})});