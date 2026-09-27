import { Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomeComponent } from './home/home.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FAQComponent } from './faq/faq.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ShopComponent } from './shop/shop.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'category-details', component: CategoryDetailsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'cart', component: CartComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
