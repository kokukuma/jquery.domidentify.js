;(function($) {
    $.fn.extend({

        getElementByIdentifyingInfo : function(info_json){
            info = JSON.parse(info_json);
            var selector;

            // select by tag_name and attribute
            if (info.tag_name){
                selector = info.tag_name;
            }

            for (var i=0; i<info.attrs.length; i++ ){
                selector += "["+ info.attrs[i].key +"=\""+ info.attrs[i].value +"\"]";
            }

            var tmp_element = jQuery(selector);
            if(tmp_element.length == 1){
                return tmp_element[0];
            }


            // select by tag_name, attribute and text
            if(info.text){
                selector += ":contains(\""+ info.text +"\")";
            }

            var elements = jQuery(selector);
            if (elements.length == 0){
                return null;

            }else if (elements.length == 1){
                return elements[0];

            }else{

                // select by tag_name, attribute, text and distance from the body
                var a = new Array();
                for (var i=0; i<jQuery(selector).length; i++){
                    var element = jQuery(selector)[i];
                    a[i] = Math.abs(body_dist(element,0) - info.body_dist);
                }
                var idx = a.indexOf(Math.min.apply(null, a));

                return jQuery(selector)[idx];
            }


        },

        getIdentifyingInfo : function(ignore_attr){
            var result = {};

            // get tag name
            result.tag_name = this[0].tagName;
            result.attrs = new Array();


            // get attribute
            var attrs = this[0].attributes;
            for (var i=0; i<attrs.length; i++ ){
                if ( ! (attrs[i].nodeName in ignore_attr) ){
                    if(attrs[i].textContent != ""){
                        result.attrs[result.attrs.length] = {"key":attrs[i].nodeName, "value":attrs[i].textContent};
                    }
                }
            }

            // get innerText
            result.text = this[0].textContent;


            // get distance from the body
            var element = this.get(0);
            result.body_dist = body_dist(element, 0);

            return JSON.stringify(result);
        }
    });

    function body_dist(element, dist){
        var el  = element.tagName;
        var num = jQuery(element).index();
        dist += num;

        if(element.parentNode.tagName == "BODY"){
            return  dist;
        }else{
            return body_dist(element.parentNode, dist);
        }
    };
})(jQuery);