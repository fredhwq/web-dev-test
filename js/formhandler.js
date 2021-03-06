// This is the javascript that handle form submission using AJAX
jQuery.noConflict();
(function($) {
        $(document).ready(function() {
            $('form.ajax-form').submit(
                function (e){
                    e.preventDefault();
													
                    var obj={form:{}};					
                    $.each($(e.target).serializeArray(),function(i,o){
                            obj.form[o.name]= o.value;
                    });
                    var form_data= JSON.stringify(obj);
                    //console.log(form_data);
                    $.ajax({
                            url: $(e.target).attr('action'),
                            data: form_data,
                            method:"POST",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(response){
                                //console.log(response);
                                $("section.main").html(''); //Empty the form to display the response
                                $.each(response,function(key,val){
                                        $("section.main").append("<div class='data-result text-center'><b>" + key + "</b><br/>" + val + "</div>");
                                });
                            },
                            failure: function(errMsg) {
                                $("section.main").prepend('Error. Check console log.');
                                console.log(errMsg);
                            }
                    });
                }
            );
        });
}(jQuery));   