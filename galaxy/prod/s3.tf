# https://github.com/duolingo/infra-terraform-galaxy/tree/master/modules/s3_website
module "duo-mingle-web-prod-s3" {
  source          = "app.terraform.io/duolingo/galaxy/terraform//modules/s3_website"
  version         = "~> 2.0"
  domain_name     = "duo-mingle.internal.duolingo.com"
  environment     = var.environment
  owner           = var.owner
  product         = var.product
  service         = var.service
  ssl_cert_domain = "*.internal.duolingo.com"
  subservice      = "s3"

  # Redirect all unknown routes to index.html
  custom_error_response = [
    {
      error_caching_min_ttl = null
      error_code            = "404"
      response_code         = "200"
      response_page_path    = "/index.html"
    },
  ]

  # Enable "Use Origin Cache Headers" setting
  default_cache_default_ttl = null
  default_cache_max_ttl     = null
  default_cache_min_ttl     = null

  # Fixes deploy issue when s3_website is set to internal-only
  block_public_acls = "false"
  # Restrict CloudFront access to an IP set. The default
  # IP Set is a list of internal Duolingo addresses.
  restrict_to_ipset = "true"

  # Fixes Terraform apply issue (CLOUD-1096)
  block_public_policy = "false"
}
