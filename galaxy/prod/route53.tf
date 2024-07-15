data "aws_route53_zone" "duolingo" {
  name = "internal.duolingo.com."
}

resource "aws_route53_record" "duo-mingle-web-prod-route53-record" {
  zone_id = data.aws_route53_zone.duolingo.zone_id
  name    = module.duo-mingle-web-prod-s3.id
  type    = "A"

  alias {
    name                   = module.duo-mingle-web-prod-s3.domain_name
    zone_id                = module.duo-mingle-web-prod-s3.cloudfront-hosted-zone-id
    evaluate_target_health = "false"
  }
}
