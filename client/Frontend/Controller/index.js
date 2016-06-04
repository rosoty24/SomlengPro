Template.index.helpers({
  singerIndex: () => SingerIndex
});
Template.index.helpers({
  inputAttributes: function () { return { class: 'form-control', placeholder: 'Search singer...' }; }
});