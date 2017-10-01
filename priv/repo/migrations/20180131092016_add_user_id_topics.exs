defmodule Discuss.Repo.Migrations.AddUserIdTopics do
  use Ecto.Migration

  def change do
    # user alter to alter existing table. The table we want to alter is :topics
    alter table(:topics) do
      # add a new column called user_id. The type is a reference to our users table
      add :user_id, references(:users)
    end
  end
end
