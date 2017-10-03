defmodule Discuss.Topic do
  use Discuss.Web, :model

  schema "topics" do
    field :title, :string
    belongs_to :user, Discuss.User
    has_many :comments, Discuss.Comment
  end

  # the struct represents the record that is in the database or is about to go in
  # the database
  # the params are the new data or the new properties that we want to insert on the record

  # the changeset object is produced by the cast function, reconds how we want to update
  # our database (the new properties to put in) and whether or not the record is valid
  def changeset(struct, params \\ %{}) do
    struct
    # cast produces a changeset
    # a changeset is the object that records the updates in our database that we need to make
    # it takes our struct (the current db) and helps produce the required result
    # the struct is what it is now
    # the params is what it needs to be
    # the cast produces the changeset
    # the changeset descibes how we get from where we are to where we need to be
    # the changeset is the object which tells us how we want to update the database
    # the chageset also describes some of the different validation errors that might exit with the update we are trying to apply
    # we trypically take the chageset and pass it to a bunch of different validators
    # this validator will inspect some of the different properties of the changeset and decide whether or not
    # the changeset is valid or not
    # the validator will update the changeset and return the changeset
    |> cast(params, [:title])
    |> validate_required([:title])
  end
end
