Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # Домашнаяя страница
  root 'static_pages#index'

  # Пути к статическим страничкам
  get 'static_pages/home'

  # По всем путям выдавать домашнюю страницу, так как роутингом управляет angularjs
  get "*path" => "static_pages#index"
end