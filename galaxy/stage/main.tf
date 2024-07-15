# The AWS region. This is normally us-east-1
provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      github-repo = var.github_repository
      pd-rotation = var.pagerduty_rotation
      team        = var.team_email
    }
  }
}

terraform {
  backend "s3" {
    bucket         = "infra-galaxy-state"
    key            = "duolingo/duo-mingle-web/stage/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = "true"
    dynamodb_table = "infra-galaxy-lock"
  }

  required_version = "1.5.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}
