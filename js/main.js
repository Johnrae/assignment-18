import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import Backbone from 'backbone';

$.ajaxSetup({
  header:{
    'X-Parse-Application-Id': 'NKQ0EaAwxrKfDTv4oD41FK5qM4HuoF67E3ClO0Hg',
    'X-Parse-REST-API-KEY': 'sUMur3NnKVo2VyZaxBEY5EdFsu2lj2fNjESEm8fu'
  }
});




let Person = Backbone.Model.extend({

  urlRoot: 'https://api.parse.com/1/classes/people',

  idAttribute: 'objectId'

});


let Peeps = Backbone.Collection.Extend({

  url: 'https://api.parse.com/1/classes/people',

  model: Person,

  parse: function(datar){
    return datar.results
  }
});

function PeepTemp(data){
  return `
    <p> This is ${data.first} ${data.last}. His favorite word is ${data.phrase}</p>
    `;
};

let people = new Peeps();

function makePeople() {
  let $d = $('<div></div>')
  people.each(function(person){
    let data = person.toJSON();
    $d.append(PeepTemp(data))
  })
};