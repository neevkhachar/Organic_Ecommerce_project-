import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannersBlocksComponent } from '../banners-blocks/banners-blocks.component';
import { BestSellingProductsComponent } from '../best-selling-products/best-selling-products.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { CategorysComponent } from '../categorys/categorys.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';
import { DownloadComponent } from '../download/download.component';
import { FeaturedProductsSectionComponent } from '../featured-products-section/featured-products-section.component';
import { FooterComponent } from '../footer/footer.component';
import { InformationComponent } from '../information/information.component';
import { IntroductionContainerComponent } from '../introduction-container/introduction-container.component';
import { JustArrivedSecComponent } from '../just-arrived-sec/just-arrived-sec.component';
import { LoaderComponent } from '../loader/loader.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PeopleLookingComponent } from '../people-looking/people-looking.component';
import { PopularProductsSectionComponent } from '../popular-products-section/popular-products-section.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent, BannersBlocksComponent, BestSellingProductsComponent, IntroductionContainerComponent, CategorysComponent, FeaturedProductsSectionComponent, DiscountSectionComponent, PopularProductsSectionComponent, JustArrivedSecComponent, BlogsComponent, DownloadComponent, PeopleLookingComponent, InformationComponent, FooterComponent, LoginpageComponent,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
