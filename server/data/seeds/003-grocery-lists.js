exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("grocery-lists")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("grocery-lists").insert([
        { id: 1, name: "test1", "user-id": 1, completed: false },
        { id: 2, name: "test2", "user-id": 2, completed: false },
        { id: 3, name: "test3", "user-id": 3, completed: false },
        { id: 4, name: "lunch and dinner", "user-id": 1, completed: false }
      ]);
    });
};