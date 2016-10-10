/***** Test IP module *****/
module.exports = function() {
  'use strict';
  return new Promise(function(resolve, reject) {
    var result = {};
    var ip_dups = {};
    var RTCPeerConnection = window.RTCPeerConnection || // 2013...
                            window.mozRTCPeerConnection || // Mozilla FireFox
                            window.webkitRTCPeerConnection; // WebKit
                         
    if (!RTCPeerConnection) {
      reject('RTCPeerConnection not supported!');
    }

    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    function handleCandidate(candidate) {
      // Match just the IP address
      var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
      var ip_addr = ip_regex.exec(candidate)[1];
      // Remove duplicates
     
      //remove duplicates
      if(ip_dups[ip_addr] === undefined) {
        if (ip_addr.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
          result.local_ip = ip_addr;
          pc.close();
          resolve(ip_addr);
        }
        // else {
        //   result.global_ip = ip_addr;
        // }
        // if(Object.size(result) == 2) {
        //   resolve(result);
        // }
      }
      ip_dups[ip_addr] = true;
    }

    // Minimal requirements for data connection
    var mediaConstraints = {
      optional: [{RtpDataChannels: true}]
    };
    var servers = {iceServers: [{urls: 'stun:stun.services.mozilla.com'}]};

    // Construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    // Listen for candidate events
    pc.onicecandidate = function(ice) {
      // Skip non-candidate events
      if(ice.candidate)
        handleCandidate(ice.candidate.candidate);
    };

    // Create a bogus data channel
    pc.createDataChannel('');

    // Create an offer sdp
    pc.createOffer(function(result) {
      // Trigger the stun server request
      pc.setLocalDescription(result, function() {}, function() {});
    }, function() {});
    // Wait for a while to let everything done
    setTimeout(function() {
      // Read candidate info from local description
      var lines = pc.localDescription.sdp.split('\n');
      lines.forEach(function(line){
        if(line.indexOf('a=candidate:') === 0)
          handleCandidate(line);
      });
    }, 1000);
  });
};