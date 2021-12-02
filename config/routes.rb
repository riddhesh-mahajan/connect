Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    namespace :v1 do
      get '/user/login', to: 'user#index'
    end
  end
end
