class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.text :content
      t.integer :likes
      t.integer :user_id, index: true

      t.timestamps
    end
  end
end
