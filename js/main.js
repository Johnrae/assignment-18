import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import Backbone from 'backbone';

$.ajaxSetup({
  headers:{
    'X-Parse-Application-Id': 'NKQ0EaAwxrKfDTv4oD41FK5qM4HuoF67E3ClO0Hg',
    'X-Parse-REST-API-KEY': 'sUMur3NnKVo2VyZaxBEY5EdFsu2lj2fNjESEm8fu'
  }
});


let Person = Backbone.Model.extend({

  urlRoot: 'https://api.parse.com/1/classes/people',

  idAttribute: 'objectId'

});


let Peeps = Backbone.Collection.extend({

  url: 'https://api.parse.com/1/classes/people',

  model: Person,

  parse: function(datar){
    return datar.results
  }
});

function PeepTemp(data){
  return `
    <div>
      <img src="${data.img}">
      <p> This is ${data.first} ${data.last}. His favorite word is ${data.phrase}.</p>
    </div>
    `;
};

let people = new Peeps();

function makePeep() {
  let $div = $('<div class="wrapper"></div>')
  people.each(function(person){
    let data = person.toJSON();
    $div.append(PeepTemp(data))
  })
  $('body').html($div);
};

people.fetch().then(makePeep);