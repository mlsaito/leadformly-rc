$(document).ready(function() {
        $('#widget-point').append(
          
          '<div id="xyz" data-widget data-locale="en" data-mode="verification" data-type="dual"></div>'
        );

        const appKey = "qi8akiro2y6yvete5o6i";
        const utmSource = "unbounce";
        const utmCampaign = "2fa_page";
        const utmContent = "adwords";
        let fp = "";
        let token = "";
        let code = ""
        let phoneNumber = "";
        let smsCount = "";
        let email = "";
        let isVerified = false;

        var widget = new RingCaptcha.Widget('#xyz', {
          app: appKey,
          events: {
            ready: function(event) {
              console.log("Ready: event:", event);
              const dataString = localStorage.getItem('ringcaptcha.widget.' + appKey);
              const data = dataString ? JSON.parse(dataString) : null;
              console.log("Ready: data:", data);
            },
            verified: function(event) {
              console.log("Verified: event:", event);
              const dataString = localStorage.getItem('ringcaptcha.widget.' + appKey);
              const data = dataString ? JSON.parse(dataString) : null;
              console.log("Ready: data:", data);
              
              phoneNumber = data.phoneNumber;
              fp = data.fingerprint;
              // Gets the hidden input value with name = 'ringcaptcha_pin_code'
              code = document.getElementsByName('ringcaptcha_pin_code')[0].value;
              smsCount = document.getElementById('how_many_sms_will_you_be_sending_each_month').value;
              email = document.getElementById('email').value;
              token = data.token;
              isVerified = true;
            }
          }
        }).setup();
        
        $('#customForm').submit(function(e) {
          e.preventDefault();
          return false;
        });
        
        // Add custom event listener to button
        $('#customButton').on('click touchstart', function(e) {
          
          var smsCount = document.getElementById('how_many_sms_will_you_be_sending_each_month').value;
          var emailField = document.getElementById('email').value;
         
          if (emailField != 0 && smsCount != 0 && isVerified == false)
          {
            alert("Please verify your phone number.");
          }
          else if (emailField != 0 && smsCount != 0 && isVerified == true)
          {
            // const widgetValidationUrl = "https://apigo.ringcaptcha.com/" + appKey + "/widget_validation";
            const url = "http://get.ringcaptcha.com/2fa1/";
            const pageName = "RingCaptcha 2FA Testing 3/2017 - DT";
            const widgetValidationUrl = "https://apigo.ringcaptcha.com/" + appKey + "/verify_phone_by_token";
            // Manually fires a conversion count
            $.get("clkg/http/");
            
            // Sends to RINGO and emails only if SMS > 500
            // if (smsCount != '0-500') {
              $.post( widgetValidationUrl, { PageName: pageName, URL: url, phone: phoneNumber, email: email, SMSCount: smsCount, fp: fp, token: token, code: code, utmSource: utmSource, utmCampaign: utmCampaign, utmContent: utmContent } );
            // }
            
            // setTimeout(function () { window.location.replace('https://my.ringcaptcha.com/register?phone=' + phoneNumber + '&email='+ emailField + '&utm_source=unbounce&utm_medium=testpage&utm_campaign=2fa_page&utm_content=adwords'); }, 1500);
          }
          
        });

        
      });