class AddDefaultPpColorToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :default_pp_color, :string
  end
end
