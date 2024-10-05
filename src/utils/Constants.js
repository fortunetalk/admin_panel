// Production Server
export const base_url = "http://97.74.83.200:4000/";
export const api_url = "http://97.74.83.200:4000/api/";

// Testing Server
// export const base_url = "http://97.74.83.200:8000/";
// export const api_url = "http://97.74.83.200:8000/api/";

// Local Server
// export const base_url = "http://localhost:4000/";
// export const api_url = "http://localhost:4000/api/";

// admin login    
export const admin_login='admin/login';
export const admin_logout='admin/logout';
export const admin_change_password='admin/change_password';

export const get_dashboard = 'admin/dashboard'

//Skills
export const add_skill = "admin/add-newSkill";
export const get_skills = "admin/skill";
export const get_active_skills = "admin/active-skill";
export const update_skill = "admin/update-skill";
export const delete_skill = "admin/skill/delete";
export const change_skill_status = "admin/change-status";

export const add_subSkill = "admin/add-new-sub-skill";
export const get_subSkill = "admin/sub-skill";
export const update_subSkill = "admin/update-sub-skill";
export const delete_subSkill = "admin/sub-skill/delete";
export const change_subSkill_status = "admin/sub-skill/change-status";

//remedy
export const add_remedy = "admin/remedies/add-new";
export const get_remedy = "admin/remedies";
export const get_active_remedy = "admin/active-remedies";
export const update_remedy = "admin/update-remedies/";
export const delete_remedy = "admin/remedies/delete";
export const change_remedy_status = "admin/remedies/change-status"

//expertise
export const add_expertise = "admin/add-new-expertise";
export const get_expertise = "admin/expertise";
export const get_active_expertise = "admin/active-expertise";
export const update_expertise = "admin/update-expertise/";
export const delete_expertise = "admin/expertise/delete";
export const change_expertise_status = "admin/expertise/change-status";

export const add_main_expertise = "admin/add-main-expertise";
export const get_main_expertise = "admin/get-all-main-expertise";
export const update_main_expertise = "admin/update-main-expertise";
export const delete_main_expertise = "admin/delete-main-expertise";

export const add_review = "api/admin/add_reviews";
export const get_review = "admin/get_all_reviews";
export const update_review = "admin/review_update";
export const delete_review = "admin/review-delete";
export const verify_review = 'admin/verify-review'

// Call Discussions

export const add_call_discussion = "admin/customer/add_discussion";
export const get_call_discussion = "admin/customer/user_discussion";
export const update_call_discussion = "admin/customer/update_discussion";
export const delete_call_discussion = "admin/customer/delete_discussion";


// Astrologers Offers

export const add_offers = "admin/offer/create_astrologer_offer";
export const get_offers = "admin/offer/get_astrologer_offer";
export const update_offers = "admin/offer/update_astrologer_offer";
export const delete_offers = "admin/offer/delete_astrologer_offer";

//Astrologer
export const add_astrologer = "admin/add-astrologers";
export const update_astrologer = "admin/astrologer_update";
export const update_astrologer_status = "admin/astrologer-change-status";
export const update_astrologer_call_status = "admin/astrologer-change-call-status";
export const update_astrologer_chat_status = "admin/astrologer-change-chat-status";
export const update_astrologer_skill = "admin//astrologer_update_skill";
export const update_astrologer_remedies = "admin/astrologer_update_remedies";
export const update_astrologer_experties = "admin/astrologer_update_expertise";
export const update_astrologer_allowed_countries = "admin/astrologer_update_allowedCountry";
export const update_astrologer_preferred_days = "admin/astrologer_update_prefer_days";
export const update_astrologer_profile_image = "admin/astrologer-update-profile-image";
export const update_astrologer_bank_image = "admin/astrologer_update_bank_proof";
export const update_astrologer_id_image = "admin/astrologer_update_id_proof";
export const update_astrologer_gallery_image = "admin/astrologer-update-gallery-image";
export const update_astrologer_astrologer_type = "admin/astrologer_update_astrologer_type";


export const create_recharge_plan = "admin/recharge_plan/add";
export const get_recharge_plans = "admin/recharge_plan";
export const update_recharge_plans = "admin/recharge_plan/update"
export const delete_recharge_plans = "admin/recharge_plan/delete"
export const update_recharge_plan_status = "admin/recharge_plan/change_status"

export const add_first_recharge_offer = "admin/add-first-recharge";
export const get_first_recharge_offer = "admin/get-first-recharge"
export const update_first_recharge_offer = "admin/update-first-recharge-offer"
export const delete_first_recharge_offer = "admin/delete-first-recharge-offer"

export const get_all_astrologers = "admin/astrologers";
export const get_all_active_astrologers = "admin/acitve_astrologers";
export const get_astrologer = "admin/astrologers/:astrologerId";
export const verify_astrologer = "astrologer/verify-astrologer-profile";
export const delete_astrologer = "admin/astrologer-delete"
export const change_call_status = 'astrologer/change-call-status'
export const change_chat_status = 'astrologer/change-chat-status'
export const get_enquired_astrologer = 'astrologer/get-enquired-astrologer'
export const change_enquiry_status = 'astrologer/change_enquiry_status'

export const get_all_users = "admin/get-all-user"
export const add_notifications = "admin/add-notifications"
export const get_all_notifications = "admin/get-all-notifications"

export const add_customer = "admin/customer/add"
export const get_all_customers = "admin/customer"
export const change_customer_status = "admin/customer/change_status"
export const online_offline_customer = "admin/set-customer-online"
export const update_customer = "admin/customer/update"
export const delete_customer = "admin/customer/delete"
export const customer_chat_history = "customers/customers-chat-history"
export const customer_call_history = "customers/customers-call-history"
export const customer_payment_history = "admin/customers-payment-list"
export const recharge_by_admin = "admin/recharge_by_admin"
export const admin_recharge_history = "admin/admin_recharge_history"
export const update_chat_call_count = "admin/customer/update_chat_call_count"

export const add_customer_recharge = 'admin/recharge-customer-wallet'

//banner
export const add_banner = "admin/banner/add"
export const get_banners = 'admin/banner'
export const get_app_banners = 'admin/get-app-banners'
export const update_banner = "admin/banner/update"
export const delete_banner = "admin/banner/delete"
export const change_redirect_banner_status='admin/banner/change-status'

//notification
export const send_customer_notification = 'admin/customer/notification/add'
export const update_customer_notification = 'admin/customer/notification/update'
export const update_customer_notification_status = 'admin/customer/notification/change_status'
export const delete_customer_notification = 'admin/customer/notification/delete'
export const get_customer_notification = 'admin/customer/notification'

export const send_astrologer_notification = 'admin/astrologer/notification/add'
export const get_astrologer_notification = 'admin/astrologer/notification'
export const update_astrologer_notification = 'admin/astrologer/notification/update'
export const update_astrologer_notification_status = 'admin/astrologer/notification/change_status'
export const delete_astrologer_notification = 'admin/astrologer/notification/delete'

export const get_chat_history = 'admin/chat_history'
export const delete_chat_history = 'admin/chat_history/delete'
export const get_admin_earnig_history = 'admin/get_call_report'
export const get_call_history = 'admin/call_history'
export const get_chat_message_details = 'admin/get_chat_message_details'
export const delete_call_history = 'admin/call_history/delete'
export const get_recharge_history = 'admin/recharge/history'
export const get_wallet_payments = 'admin/get_wallet_payments'
export const get_demo_class_history = 'admin/booked_demo_class'
export const change_demo_class_history_status = 'admin/booked_demo_class/change_status'
export const delete_demo_class_history = 'admin/booked_demo_class/delete'
export const get_live_class_history = 'admin/register_live_class'
export const change_live_class_history_status = 'admin/register_live_class/change_status'
export const delete_live_class_history = 'admin/register_live_class/delete'
export const get_live_course_history = 'admin/get_live_course_history'
export const change_live_course_history_status = 'admin/course/change-course-status'
export const get_register_live_class_history = 'admin/live_class_history_by_astrologer_id'


export const create_language = 'admin/create_language'
export const get_language  = 'admin/get_language'
export const update_language  = 'admin/update_language'
export const delete_language  = 'admin/delete_language'

//product category
export const create_product_category='admin/product-category/add'
export const product_category_list='admin/product-category'
export const update_product_category = 'admin/product-category/update'
export const update_product_category_image = 'admin/product-category/update-image';
export const delete_product_category = 'admin/product-category/delete'
export const change_product_category_status = 'admin/product-category/change-status'

//product
export const create_product='admin/product/add'
export const product_list='admin/product'
export const update_product = 'admin/product/update'
export const delete_product = 'admin/product/delete'
export const change_product_status = 'admin/product/change-status'

//pooja category
export const create_pooja_category='admin/pooja-category/add'
export const pooja_category_list='admin/pooja-category'
export const update_pooja_category = 'admin/pooja-category/update'
export const update_pooja_category_image = 'admin/pooja-category/update-image';
export const delete_pooja_category = 'admin/pooja-category/delete'
export const change_pooja_category_status = 'admin/pooja-category/change-status'

//pooja
export const create_pooja='admin/pooja/add'
export const pooja_list='admin/pooja'
export const update_pooja = 'admin/pooja/update'
export const delete_pooja = 'admin/pooja/delete'
export const change_pooja_status = 'admin/pooja/change-status'

//BLOG CATEGORY
export const create_blog_category='admin/add-blog-category'
export const blog_category_list='admin/blog-category-list'
export const update_blog_category='admin/blog-category/update/'
export const delete_blog_category='admin/blog-category/delete'
export const active_blog_category='admin/active-blog-category'

//BLOG
export const create_blog='admin/blog/add'
export const blog_list='admin/blog'
export const update_blog='admin/blog/update'
export const update_blog_status='admin/blog/change_status'
export const delete_blog='admin/blog/delete'
export const delete_multiple_blog='admin/delete-multiple-blog'

//country
export const get_country='admin/country'
export const get_country_value='admin/country_value'
export const add_new_country='admin/add-new-country'
export const update_country='admin/country/update/'
export const delete_country='admin/country/delete'
export const change_country_status='admin/country/change-status'
export const country_state_list= 'admin/country/state'
export const state_city_list= 'admin/state/city'

//state
export const get_state='admin/state'
export const add_new_state='admin/add-new-state'
export const update_state='admin/state/update/'
export const delete_state='admin/state/delete'
export const change_state_status='admin/state/change-status'

//City
export const get_city='admin/city'
export const add_new_city='admin/add-new-city'
export const update_city='admin/city/update/'
export const delete_city='admin/city/delete'
export const change_city_status='admin/city/change-status'

//COURSE
export const create_course='admin/course/add'
export const course_list='admin/course'
export const active_course_list='admin/active_course'
export const update_course = 'admin/course/update'
export const change_course_status = 'admin/course/change-status'
export const delete_course = 'admin/course/delete'

//DEMO CLASS
export const create_demo_class='admin/demo_class/add_new'
export const demo_class_list='admin/demo_class'
export const update_demo_class = 'admin/demo_class/update'
export const change_demo_class_status = 'admin/demo_class/change_status'
export const change_demo_class_admin_status = 'admin/demo_class/change_admin_status'
export const change_demo_class_ongoing_status = 'admin/booked_demo_class/change_class_status'
export const delete_demo_class = 'admin/demo_class/delete'
export const booked_demo_class = 'admin/booked_demo_class'

//WORKSHOP
export const create_workshop='admin/workshop/add_new'
export const workshop_list='admin/workshop'
export const update_workshop = 'admin/workshop/update'
export const change_workshop_status = 'admin/workshop/change_status'
export const change_workshop_admin_status = 'admin/workshop/change_admin_status'
export const delete_workshop = 'admin/workshop/delete'

//MCQ
export const create_mcq='admin/mcq/add_new'
export const mcq_list='admin/mcq'
export const update_mcq = 'admin/mcq/update'
export const change_mcq_status = 'admin/mcq/change_status'
export const change_mcq_admin_status = 'admin/mcq/change_admin_status'
export const delete_mcq = 'admin/mcq/delete'
export const mcq_answer_list='admin/mcqAnsList'

//LIVE CLASS
export const create_live_class='admin/live_class/add_new'
export const live_class_list='admin/live_class'
export const update_live_class = 'admin/live_class/update'
export const change_live_class_status = 'admin/live_class/change_status'
export const change_live_class_admin_status = 'admin/live_class/change_admin_status'
export const change_live_class_ongoing_status = 'admin/live_class/change_class_status'
export const delete_live_class = 'admin/live_class/delete'

//SCHEDULE CLASS
export const add_class='admin/class/add_new'
export const class_list='admin/class'
export const update_class = 'admin/class/update'
export const change_class_status = 'admin/class/change_status'
export const delete_class = 'admin/class/delete'

//COURSE BANNER
export const create_course_banner='admin/course-banner/add'
export const course_banner_list='admin/course-banner'
export const update_course_banner = 'admin/course-banner/update'
export const change_course_banner_status = 'admin/course-banner/change-status'
export const delete_course_banner = 'admin/course-banner/delete'

//ASTROLOGER TRAINING BANNER
export const create_astrologer_training_banner='admin/astrologer-training-banner/add'
export const astrologer_training_banner_list='admin/astrologer-training-banner'
export const update_astrologer_training_banner = 'admin/astrologer-training-banner/update'
export const change_astrologer_training_banner_status = 'admin/astrologer-training-banner/change-status'
export const delete_astrologer_training_banner = 'admin/astrologer-training-banner/delete'

//ECOMMERCE BANNER
export const create_ecommerce_banner='admin/ecommerce-banner/add'
export const ecommerce_banner_list='admin/ecommerce-banner'
export const update_ecommerce_banner = 'admin/ecommerce-banner/update'
export const change_ecommerce_banner_status = 'admin/ecommerce-banner/change-status'
export const delete_ecommerce_banner = 'admin/ecommerce-banner/delete'

//ASTROLOGER BANNER
export const create_astrologer_banner='admin/astrologer-banner/add'
export const astrologer_banner_list='admin/astrologer-banner'
export const update_astrologer_banner = 'admin/astrologer-banner/update'
export const change_astrologer_banner_status = 'admin/astrologer-banner/change-status'
export const delete_astrologer_banner = 'admin/astrologer-banner/delete'

//PRODUCT BANNER
export const create_product_banner='admin/product-banner/add'
export const product_banner_list='admin/product-banner'
export const update_product_banner = 'admin/product-banner/update'
export const change_product_banner_status = 'admin/product-banner/change-status'
export const delete_product_banner = 'admin/product-banner/delete'

//POOJA BANNER
export const create_pooja_banner='admin/pooja-banner/add'
export const pooja_banner_list='admin/pooja-banner'
export const update_pooja_banner = 'admin/pooja-banner/update'
export const change_pooja_banner_status = 'admin/pooja-banner/change-status'
export const delete_pooja_banner = 'admin/pooja-banner/delete'

//CALL-CHAT BANNER
export const create_call_chat_banner='admin/chat-call-banner/add'
export const call_chat_banner_list='admin/chat-call-banner'
export const update_call_chat_banner = 'admin/chat-call-banner/update'
export const change_call_chat_banner_status = 'admin/chat-call-banner/change-status'
export const delete_call_chat_banner = 'admin/chat-call-banner/delete'

//Testimonials
export const create_testimonial='admin/testimonial/add'
export const testimonial_list='admin/testimonial'
export const update_testimonial = 'admin/testimonial/update'
export const change_testimonial_status = 'admin/testimonial/change-status'
export const delete_testimonial = 'admin/testimonial/delete'

//Testimonials
export const create_gift='admin/gift/add'
export const gift_list='admin/gift'
export const update_gift = 'admin/gift/update'
export const change_gift_status = 'admin/gift/change_status'
export const delete_gift = 'admin/gift/delete'

//Privacy Policy
export const create_privacy_policy='admin/privacy-policy/add'
export const privacy_policy_list='admin/privacy-policy'
export const update_privacy_policy = 'admin/privacy-policy/update'
export const change_privacy_policy_status = 'admin/privacy-policy/change-status'
export const delete_privacy_policy = 'admin/privacy-policy/delete'

//Terms and Condition
export const create_term_condition='admin/term-condition/add'
export const term_condition_list='admin/term-condition'
export const update_term_condition = 'admin/term-condition/update'
export const change_term_condition_status = 'admin/term-condition/change-status'
export const delete_term_condition = 'admin/term-condition/delete'

//request
export const get_profile_request = 'admin/request/profile';
export const update_profile_request = 'admin/verify/request/profile'
export const get_phone_request = 'admin/request/phoneNumber';
export const update_phone_request = 'admin/verify/request/phoneNumber'
export const get_bank_request = 'admin/request/bank';
export const update_bank_request = 'admin/verify/request/bank'
export const get_gallery_request = 'admin/request/gallery';
export const update_gallery_request = 'admin/verify/request/gallery'

//live stream
export const get_live_stream_list= 'admin/live_stream'
export const update_live_stream_status= 'admin/live_stream/change_status'
export const delete_live_stream= 'admin/live_stream/delete'

//recharge
export const recharge_history_list= 'admin/recharge/history'
export const recharge_history_add= 'admin/recharge/add'
export const recharge_history_delete= 'admin/recharge/delete'

export const get_all_country = 'https://api.countrystatecity.in/v1/countries'
