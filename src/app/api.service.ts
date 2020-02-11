import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData() {
    const _headers = new HttpHeaders();
    return this.http.get('./assets/data.xml',{headers: _headers,responseType: 'text'});
  }

  getDataString(xmlString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlString.trim(), 'text/xml');

    const json = {'document': this.domToJson(dom.documentElement)};

    const xmlBackconverted = this.jsonToDom(json);

    const serializer = new XMLSerializer();
    const domSerialized = serializer.serializeToString(dom);

    return json;
  }

  append(obj, val) {
    if(obj) {
      if(Array.isArray(obj)) {
        obj.push(val);
      } else {
        obj = [obj, val];
      }
    } else {
      obj = val;
    }
    return obj;
  }

  stopIterationTag(tag) {
    switch (tag) {
      case "description": case "legend": case "nameWithTitle": case "adress": case "phone": case "email": case "date": case "location": case "name": return true; break;
      default: return false; break;
    }
  }

  domToJson(el) {
    var y = el.attributes;
    var obj = {};
    for (let x of el.childNodes) {
      if(x.nodeName === "#text") {
        continue;
      }
      if(!this.stopIterationTag(x.tagName) && (x.childElementCount > 0 || (x.attributes && x.attributes.length > 0))) {
        let val = this.domToJson(x);
        if(x.attributes && x.attributes.length > 0) {
          let atts = {};
          Array.prototype.slice.call(x.attributes).forEach(function(item) {
            atts[item.name] = item.value;
          });
          val["attributes"] = this.append(val["attributes"], atts);
        }
        obj[x.nodeName] = this.append(obj[x.nodeName], val);
      } else if(x.innerHTML) {
        obj[x.nodeName] = this.append(obj[x.nodeName], x.innerHTML.trim());
      }
    }
    return obj;
  }

  jsonToDom(json) {
    //console.log("Json: "+json);
    let node = this.recurseJsonToDom('document', json['document']);
    //console.log("End Json: ");
    //console.log(node);
  }

  recurseJsonToDom(key, json) {
    //console.log("Begin "+key+" value "+json+" type "+typeof(json));
    let node = document.createElement(key);
    for (let key of Object.keys(json)) {
      if(Array.isArray(json[key])) {
        //console.log("Array");
      } else {
        if (typeof(json[key]) === "object" && json[key] !== null) {
          //console.log("object "+key + ": " + json[key]);
          node.appendChild(this.recurseJsonToDom(key, json[key]));
        } else {
          //console.log("text "+key+" value "+json[key]);
          node.innerHTML = json[key] !== null ? json[key] : "";
        }
      }
    }
    //console.log("End "+key+" value "+json+" type "+typeof(json));
    //console.log(node);
    return node;
  }
}
