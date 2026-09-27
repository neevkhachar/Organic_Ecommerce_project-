import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { LoaderComponent } from "./loader/loader.component";
import { BannersBlocksComponent } from "./banners-blocks/banners-blocks.component";
import { BestSellingProductsComponent } from "./best-selling-products/best-selling-products.component";
import { IntroductionContainerComponent } from "./introduction-container/introduction-container.component";
import { CategorysComponent } from "./categorys/categorys.component";
import { FeaturedProductsSectionComponent } from "./featured-products-section/featured-products-section.component";
import { DiscountSectionComponent } from "./discount-section/discount-section.component";
import { PopularProductsSectionComponent } from "./popular-products-section/popular-products-section.component";
import { JustArrivedSecComponent } from "./just-arrived-sec/just-arrived-sec.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { DownloadComponent } from "./download/download.component";
import { PeopleLookingComponent } from "./people-looking/people-looking.component";
import { InformationComponent } from "./information/information.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { NgIf } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { ToastComponent } from "./toast/toast.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent, BannersBlocksComponent, BestSellingProductsComponent, IntroductionContainerComponent, CategorysComponent, FeaturedProductsSectionComponent, DiscountSectionComponent, PopularProductsSectionComponent, JustArrivedSecComponent, BlogsComponent, DownloadComponent, PeopleLookingComponent, InformationComponent, FooterComponent, LoginpageComponent, NgIf, HomeComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerse_project';
}
